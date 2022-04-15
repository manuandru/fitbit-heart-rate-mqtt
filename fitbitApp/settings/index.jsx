function mySettings(props) {
  return (
    <Page>
      <Section
        title={<Text bold align="center">Websockets Settings</Text>}>
        <TextInput
          title="Server URL"
          label="Server URL"
          placeholder="ws://xxx.xxx.xxx.xxx:PORT"
          settingsKey="websocketURL"
        />
        <Toggle
          settingsKey="sendData"
          label="Send via WebSocket"
        />
      </Section>
    </Page>
  );
}

registerSettingsPage(mySettings);