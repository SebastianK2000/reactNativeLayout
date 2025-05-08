import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, StyleSheet, Button } from 'react-native';
import { getTeams, getTeamMembers } from '../../../../services/api';

const TeamListScreen = () => {
  const [teams, setTeams] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const teamData = await getTeams();
        const memberData = await getTeamMembers();
        setTeams(teamData);
        setTeamMembers(memberData);
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

  const handleDeleteTeamMember = (id: string) => {
    setTeamMembers(teamMembers.filter((item: any) => item.IDteamMember !== id));
  };

  const handleEditTeamMember = (id: string) => {
    console.log(`Edit team member with id: ${id}`);
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

  const renderTeamMember = (item: any) => (
    <View style={styles.itemBox}>
      <Text style={styles.itemTitle}>Member: {item.IDuser || 'No User ID'}</Text>
      <Text style={styles.itemDetail}>👥 Team ID: {item.IDteam}</Text>
      <Text style={styles.itemDetail}>📅 Joined: {item.joinDate || 'No Date'}</Text>

      <View style={styles.buttonContainer}>
        <Button title="Edit" onPress={() => handleEditTeamMember(item.IDteamMember)} />
        <Button title="Delete" onPress={() => handleDeleteTeamMember(item.IDteamMember)} />
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.sectionTitle}>🏁 Teams</Text>
      <Button title="Add New Team" onPress={() => console.log('Add new Team')} />
      {teams.map((item) => (
        <React.Fragment key={item}>{renderTeam(item)}</React.Fragment>
      ))}

      <Text style={styles.sectionTitle}>👤 Team Members</Text>
      <Button title="Add New Team Member" onPress={() => console.log('Add new Team Member')} />
      {teamMembers.map((item) => (
        <React.Fragment key={item}>{renderTeamMember(item)}</React.Fragment>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: '#333',
  },
  itemDetail: {
    fontSize: 16,
    color: '#555',
    marginBottom: 4,
  },
  itemBox: {
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    padding: 14,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});

export default TeamListScreen;
