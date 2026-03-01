import React, {useEffect, useState} from 'react'
import {Card, Stack, Text, Button, TextArea, TextInput, Box, Flex} from '@sanity/ui'
import {useClient} from 'sanity'
import {set, unset} from 'sanity'

interface Testimony {
  _key?: string
  text: string
  name: string
}

interface Work {
  _id: string
  name: string
  venue?: string
  testimonies?: Testimony[]
}

interface WorkTestimoniesProps {
  personId: string
  personName: string
}

export function WorkTestimonies({personId, personName}: WorkTestimoniesProps) {
  const client = useClient({apiVersion: '2024-01-01'})
  const [works, setWorks] = useState<Work[]>([])
  const [loading, setLoading] = useState(true)
  const [editingWork, setEditingWork] = useState<string | null>(null)
  const [testimonyText, setTestimonyText] = useState('')
  const [testimonyName, setTestimonyName] = useState('')

  useEffect(() => {
    if (!personId) return

    const query = `*[_type == "work" && $personId in people[]._ref] {
      _id,
      name,
      venue,
      testimonies
    }`

    client.fetch(query, {personId}).then((fetchedWorks) => {
      console.log('Fetched works for person:', personId, fetchedWorks)
      setWorks(fetchedWorks)
      setLoading(false)
    }).catch((error) => {
      console.error('Error fetching works:', error)
      setLoading(false)
    })
  }, [personId, client])

  const handleAddTestimony = async (workId: string) => {
    if (!testimonyText.trim() || !testimonyName.trim()) {
      alert('Please fill in both testimony text and name')
      return
    }

    const work = works.find((w) => w._id === workId)
    if (!work) return

    const newTestimony: Testimony = {
      _key: `testimony-${Date.now()}`,
      text: testimonyText,
      name: testimonyName,
    }

    const updatedTestimonies = [...(work.testimonies || []), newTestimony]

    await client
      .patch(workId)
      .set({testimonies: updatedTestimonies})
      .commit()

    setWorks(
      works.map((w) =>
        w._id === workId ? {...w, testimonies: updatedTestimonies} : w
      )
    )

    setTestimonyText('')
    setTestimonyName('')
    setEditingWork(null)
  }

  const handleDeleteTestimony = async (workId: string, testimonyKey: string) => {
    const work = works.find((w) => w._id === workId)
    if (!work) return

    const updatedTestimonies = (work.testimonies || []).filter(
      (t) => t._key !== testimonyKey
    )

    await client
      .patch(workId)
      .set({testimonies: updatedTestimonies})
      .commit()

    setWorks(
      works.map((w) =>
        w._id === workId ? {...w, testimonies: updatedTestimonies} : w
      )
    )
  }

  if (loading) {
    return <Text>Loading works...</Text>
  }

  if (works.length === 0) {
    return <Text muted>This person is not associated with any works yet.</Text>
  }

  return (
    <Stack space={4}>
      <Text weight="semibold" size={2}>
        Works featuring {personName || 'this person'}
      </Text>
      {works.map((work) => (
        <Card key={work._id} padding={4} border radius={2}>
          <Stack space={3}>
            <Flex justify="space-between" align="center">
              <Box>
                <Text weight="semibold">{work.name}</Text>
                {work.venue && <Text muted size={1}>{work.venue}</Text>}
              </Box>
            </Flex>

            {work.testimonies && work.testimonies.length > 0 && (
              <Stack space={2}>
                <Text size={1} weight="semibold">Existing Testimonies:</Text>
                {work.testimonies.map((testimony) => (
                  <Card key={testimony._key} padding={3} tone="primary" radius={1}>
                    <Stack space={2}>
                      <Text size={1}>"{testimony.text}"</Text>
                      <Flex justify="space-between" align="center">
                        <Text size={1} muted>— {testimony.name}</Text>
                        <Button
                          text="Delete"
                          tone="critical"
                          mode="ghost"
                          fontSize={1}
                          onClick={() => handleDeleteTestimony(work._id, testimony._key!)}
                        />
                      </Flex>
                    </Stack>
                  </Card>
                ))}
              </Stack>
            )}

            {editingWork === work._id ? (
              <Card padding={3} tone="transparent" border>
                <Stack space={3}>
                  <TextArea
                    placeholder="Enter testimony text..."
                    value={testimonyText}
                    onChange={(e) => setTestimonyText(e.currentTarget.value)}
                    rows={3}
                  />
                  <TextInput
                    placeholder="Testimony author name..."
                    value={testimonyName}
                    onChange={(e) => setTestimonyName(e.currentTarget.value)}
                  />
                  <Flex gap={2}>
                    <Button
                      text="Save Testimony"
                      tone="positive"
                      onClick={() => handleAddTestimony(work._id)}
                    />
                    <Button
                      text="Cancel"
                      mode="ghost"
                      onClick={() => {
                        setEditingWork(null)
                        setTestimonyText('')
                        setTestimonyName('')
                      }}
                    />
                  </Flex>
                </Stack>
              </Card>
            ) : (
              <Button
                text="Add Testimony"
                tone="primary"
                mode="ghost"
                onClick={() => setEditingWork(work._id)}
              />
            )}
          </Stack>
        </Card>
      ))}
    </Stack>
  )
}
