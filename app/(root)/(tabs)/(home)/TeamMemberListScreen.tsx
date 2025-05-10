import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, StyleSheet, Button } from 'react-native';
import { getTeamMembers } from '../../../../services/api';

const TeamMemberListScreen = () => {
  interface TeamMember {
    IDteamMember: string;
    IDuser?: string;
    IDteam: string;
    joinDate?: string;
  }
  
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const memberData = await getTeamMembers();
        setTeamMembers(memberData);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  const handleDeleteTeamMember = (id: string) => {
    setTeamMembers(teamMembers.filter((item: any) => item.IDteamMember !== id));
  };

  const handleEditTeamMember = (id: string) => {
    console.log(`Edit team member with id: ${id}`);
  };

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
      <Text style={styles.sectionTitle}>👤 Team Members</Text>
      <Button title="Add New Team Member" onPress={() => console.log('Add new Team Member')} />
      {teamMembers.map((item) => (
        <React.Fragment key={item.IDteamMember}>{renderTeamMember(item)}</React.Fragment>
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

export default TeamMemberListScreen;
