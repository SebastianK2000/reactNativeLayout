import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, StyleSheet, Button } from 'react-native';
import { getTeams } from '../../../../services/api';

const TeamListScreen = () => {
  interface Team {
    IDteam: string;
    teamName?: string;
    creationAt?: string;
  }

  const [teams, setTeams] = useState<Team[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const teamData = await getTeams();
        setTeams(teamData);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  const handleDeleteTeam = (id: string) => {
    setTeams(teams.filter((item: any) => item.IDteam !== id));
  };

  const handleEditTeam = (id: string) => {
    console.log(`Edit team with id: ${id}`);
  };

  const renderTeam = (item: any) => (
    <View style={styles.itemBox}>
      <Text style={styles.itemTitle}>Team: {item.teamName || 'No Name'}</Text>
      <Text style={styles.itemDetail}>📅 Created: {item.creationAt || 'No Date'}</Text>
      <View style={styles.buttonContainer}>
        <Button title="Edit" onPress={() => handleEditTeam(item.IDteam)} />
        <Button title="Delete" onPress={() => handleDeleteTeam(item.IDteam)} />
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.sectionTitle}>🏁 Teams</Text>
      <Button title="Add New Team" onPress={() => console.log('Add new Team')} />
      {teams.map((item) => (
        <React.Fragment key={item.IDteam}>{renderTeam(item)}</React.Fragment>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16 },
  sectionTitle: { fontSize: 22, fontWeight: 'bold', marginTop: 20, marginBottom: 10, color: '#333' },
  itemBox: { backgroundColor: '#f8f8f8', borderRadius: 8, padding: 14, marginBottom: 12 },
  itemTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 8 },
  itemDetail: { fontSize: 16, color: '#555', marginBottom: 4 },
  buttonContainer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
});

export default TeamListScreen;
