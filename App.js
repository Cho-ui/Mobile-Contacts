import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import * as Contacts from 'expo-contacts';

export default function App() {
  const [contacts, setContacts] = useState([]);

  const getContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === 'granted') {
      const { data } = await Contacts.getContactsAsync(
        { fields: [Contacts.Fields.PhoneNumbers] });
      if (data.length > 0) {
        setContacts(data);
      }
    };
  };


  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.listContainer}>
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) =>
            <View>
              <Text>{item.name} {item.phoneNumbers[0].number}</Text>
            </View>}
          data={contacts}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button title='Get Contacts' onPress={getContacts}></Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    marginBottom: 200
  },
  listContainer: {
    marginTop: 200
  }
});
