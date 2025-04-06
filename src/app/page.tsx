'use client'
import { PlusIcon, TrashIcon } from "@radix-ui/react-icons";
import { Flex, Text, Button, Box, Tabs, Grid, Table, IconButton, TextField, Dialog } from "@radix-ui/themes";
import { useEffect, useRef, useState } from "react";

export default function MyApp() {
  let ref = useRef(null)
  let [api, setAPI] = useState<any>([])
  let [reporters, setReporters] = useState<any>([])
  let [incidents, setIncidents] = useState<any>([])
  let [loading, setLoading] = useState(false)
  async function refresh() {
    setLoading(true)
    let req = await fetch(`https://api.thetechtitans.vip/api-keys`, {
      method: "POST",
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        key: localStorage.getItem("master_key")
      })
    })
    if(req.ok) {
      let json = await req.json()
      setAPI(json)
    }
    let req1 = await fetch(`https://api.thetechtitans.vip/reporters`, {
      method: "POST",
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        key: localStorage.getItem("api_key")
      })
    })
    if(req1.ok) {
      let json = await req1.json()
      setReporters(json)
    }
    let req2 = await fetch(`https://api.thetechtitans.vip/incidents`, {
      method: "POST",
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        key: localStorage.getItem("master_key")
      })
    })
    if(req2.ok) {
      let json = await req2.json()
      setIncidents(json)
    }
    setLoading(false)
  }
  useEffect(() => {
    refresh()
  }, [])
	return (
    <>
		<Text size="9" as="p" align="center" mt="5">Welcome Back</Text>
    <br></br>
    <br></br>
    <Grid style={{placeItems: "center"}}>
      <Button size="4" color="blue" onClick={refresh}>Refresh</Button>
      <br></br>
      <br></br>
    <Tabs.Root defaultValue="api" style={{scale: 1.2, opacity: loading ? 0.7 : 1, width: "400px"}} aria-disabled={loading}>
	<Tabs.List>
		<Tabs.Trigger value="api">API Keys</Tabs.Trigger>
		<Tabs.Trigger value="reporters">Reporters</Tabs.Trigger>
		<Tabs.Trigger value="incidents">Incidents</Tabs.Trigger>
	</Tabs.List>

	<Box pt="3">
		<Tabs.Content value="api">
      <Flex gap="3">
        <TextField.Root placeholder="longitude, latitude" ref={ref} />
        <IconButton onClick={async () => {
          let cords = (ref.current as any).value.split(", ").map(parseFloat)
          if(cords.length != 2) return;
          let coordinates = {
            longitude: cords[0],
            latitude: cords[1]
          }
          let req = await fetch(`https://api.thetechtitans.vip/api-key`, {
            method: "POST",
            headers: {
              'content-type': 'application/json'
            },
            body: JSON.stringify({
              key: localStorage.getItem("master_key"),
              ...coordinates,
            })
          })
          if(req.ok) {
            let json = await req.json()
            setAPI([...api, json] as any)
            alert(`Here is your API Key ID: ${json.id}`);
            (ref.current as any).value = ""
          }
        }}><PlusIcon></PlusIcon></IconButton>
      </Flex>
      <br></br>
			<Table.Root variant="surface">
	<Table.Header>
		<Table.Row>
			<Table.ColumnHeaderCell>Location</Table.ColumnHeaderCell>
			<Table.ColumnHeaderCell>Delete</Table.ColumnHeaderCell>
		</Table.Row>
	</Table.Header>

	<Table.Body>
		{api.map((e:any) => <Table.Row key={e._id}>
			<Table.RowHeaderCell>{e.location.longitude}, {e.location.latitude}</Table.RowHeaderCell>
			<Table.Cell><IconButton color="red" size="4" onClick={async () => {
        let req = await fetch(`https://api.thetechtitans.vip/api-key`, {
          method: "DELETE",
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify({
            key: localStorage.getItem("master_key"),
            id: e._id.toString()
          })
        })
        if(req.ok) {
          refresh()
        } else {
          let json = await req.json()
          alert(json.message);
        }
      }}><TrashIcon style={{scale: 1.3}}></TrashIcon></IconButton></Table.Cell>
		</Table.Row>)}
	</Table.Body>
</Table.Root> 
		</Tabs.Content>

		<Tabs.Content value="reporters">
      <Flex gap="3">
        <TextField.Root placeholder="longitude, latitude" ref={ref} />
        <IconButton onClick={async () => {
          let cords = (ref.current as any).value.split(", ").map(parseFloat)
          if(cords.length != 2) return;
          let coordinates = {
            longitude: cords[0],
            latitude: cords[1]
          }
          let req = await fetch(`https://api.thetechtitans.vip/reporter`, {
            method: "POST",
            headers: {
              'content-type': 'application/json'
            },
            body: JSON.stringify({
              key: localStorage.getItem("api_key"),
              ...coordinates,
            })
          })
          if(req.ok) {
            let json = await req.json()
            setReporters([...api, json] as any)
            alert(`Here is your reporter ID: ${json.id}`);
            (ref.current as any).value = ""
          } else {
            let json = await req.json()
            alert(json.message);
          }
        }}><PlusIcon></PlusIcon></IconButton>
      </Flex>
      <br></br>
			<Table.Root variant="surface">
	<Table.Header>
		<Table.Row>
			<Table.ColumnHeaderCell>Location</Table.ColumnHeaderCell>
			<Table.ColumnHeaderCell>Delete</Table.ColumnHeaderCell>
		</Table.Row>
	</Table.Header>

	<Table.Body>
		{reporters.map((e:any) => <Table.Row key={e._id}>
			<Table.RowHeaderCell>{e.location.longitude}, {e.location.latitude}</Table.RowHeaderCell>
			<Table.Cell><IconButton color="red" size="4" onClick={async () => {
        let req = await fetch(`https://api.thetechtitans.vip/reporter`, {
          method: "DELETE",
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify({
            key: localStorage.getItem("api_key"),
            id: e._id.toString()
          })
        })
        if(req.ok) {
          let json = await req.json()
          setReporters([...reporters.filter((e: any) => e._id.toString() !== json.id)])
        }
      }}><TrashIcon style={{scale: 1.3}}></TrashIcon></IconButton></Table.Cell>
		</Table.Row>)}
	</Table.Body>
</Table.Root> 
		</Tabs.Content>

    <Tabs.Content value="incidents">
      <br></br>
			<Table.Root variant="surface">
	<Table.Header>
		<Table.Row>
			<Table.ColumnHeaderCell>Location</Table.ColumnHeaderCell>
      <Table.ColumnHeaderCell>Disaster</Table.ColumnHeaderCell>
			<Table.ColumnHeaderCell>Delete</Table.ColumnHeaderCell>
		</Table.Row>
	</Table.Header>

	<Table.Body>
		{incidents.map((e:any) => <Table.Row key={e._id}>
			<Table.RowHeaderCell>{e.location.longitude}, {e.location.latitude}</Table.RowHeaderCell>
      <Table.Cell>{e.disaster}</Table.Cell>
			<Table.Cell><IconButton color="red" size="4" onClick={async () => {
        let req = await fetch(`https://api.thetechtitans.vip/incident`, {
          method: "DELETE",
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify({
            key: localStorage.getItem("master_key"),
            id: e._id.toString()
          })
        })
        if(req.ok) {
          let json = await req.json()
          setIncidents([...incidents.filter((e: any) => e._id.toString() !== json.id)])
        }
      }}><TrashIcon style={{scale: 1.3}}></TrashIcon></IconButton></Table.Cell>
		</Table.Row>)}
	</Table.Body>
</Table.Root> 
		</Tabs.Content>
	</Box>
</Tabs.Root>

    </Grid>
</>
	);
}