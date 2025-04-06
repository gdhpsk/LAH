'use client'
import { Grid, Flex, Dialog, TextField, Text, Button } from "@radix-ui/themes";
import { useRef } from "react";

export default function NavBar() {
    let ref = useRef(null)
    let ref2 = useRef(null)

    return (
        <Grid style={{ placeItems: "end", marginTop: "-9px", marginRight: "-8px" }}>
            <Flex gap="1">
              <Grid p="4" className="nav-item">
                <Dialog.Root>
                  <Dialog.Trigger>
                    <Text as="p">Master Key</Text>
                  </Dialog.Trigger>

                  <Dialog.Content maxWidth="450px">
                    <Dialog.Title>Input Master Key</Dialog.Title>
                    <Dialog.Description size="2" mb="4">
                      Root access to interface
                    </Dialog.Description>

                    <Flex direction="column" gap="3">
                      <label>
                        <TextField.Root
                            ref={ref}
                          placeholder="Key..."
                        />
                      </label>
                    </Flex>
                    <br></br>
                    <Dialog.Close>
				<Button onClick={() => {
                    localStorage.setItem("master_key", (ref.current as any).value)
                    window.location.reload()
                }}>Save</Button>
			</Dialog.Close>
                  </Dialog.Content>
                </Dialog.Root>

              </Grid>
              <Grid p="4" className="nav-item">
                <Dialog.Root>
                  <Dialog.Trigger>
                    <Text as="p">API Key</Text>
                  </Dialog.Trigger>

                  <Dialog.Content maxWidth="450px">
                    <Dialog.Title>Input API Key</Dialog.Title>
                    <Dialog.Description size="2" mb="4">
                    Create Reporters
                    </Dialog.Description>

                    <Flex direction="column" gap="3">
                      <label>
                        <TextField.Root
                            ref={ref2}
                          placeholder="Key..."
                        />
                      </label>
                    </Flex>
                    <br></br>
                    <Dialog.Close>
				<Button onClick={() => {
                    localStorage.setItem("api_key", (ref2.current as any).value)
                    window.location.reload()
                }}>Save</Button>
			</Dialog.Close>
                  </Dialog.Content>
                </Dialog.Root>

              </Grid>
            </Flex>
          </Grid>
    )
}