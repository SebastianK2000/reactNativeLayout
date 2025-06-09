import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, StyleSheet, Button, Alert, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import {
  getTeamMembers,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember,
  getUsers,
  getTeams
} from '../../../../services/api';

const TeamMemberListScreen = () => {
  interface User {
    id: string;
    firstName: string;
    lastName: string;
  }

  interface Team {
    id: string;
    teamName: string;
  }

  interface TeamMember {
    IDteamMember: string;
    IDuser: string;
    IDteam: string;
    joinDate: string;
    User?: User;
    Team?: Team;
  }

  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);

  const today = new Date().toISOString().split('T')[0];

  const [IDuser, setIDuser] = useState('');
  const [IDteam, setIDteam] = useState('');
  const [joinDate, setJoinDate] = useState(today);
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const members = await getTeamMembers();
        const userList = await getUsers();
        const teamList = await getTeams();
        setTeamMembers(members);
        setUsers(userList.map((u: any) => ({
          id: u.iDuser,
          firstName: u.firstName,
          lastName: u.lastName
        })));
        setTeams(teamList);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  const resetForm = () => {
    setIDuser('');
    setIDteam('');
    setJoinDate(today);
    setEditingMember(null);
    setIsFormVisible(false);
  };

  const handleAddOrUpdate = async () => {
    if (!IDuser || !IDteam || !joinDate) {
      Alert.alert('Błąd', 'Uzupełnij wszystkie pola');
      return;
    }

    const payload = {
      IDuser,
      IDteam,
      joinDate: new Date(joinDate).toISOString(),
    };

    try {
      if (editingMember) {
        await updateTeamMember(editingMember.IDteamMember, payload);
        setTeamMembers(members =>
          members.map(m =>
            m.IDteamMember === editingMember.IDteamMember
              ? { ...payload, IDteamMember: editingMember.IDteamMember }
              : m
          )
        );
        Alert.alert('Zaktualizowano', 'Członek drużyny zaktualizowany.');
      } else {
        const created = await createTeamMember(payload);
        setTeamMembers(prev => [...prev, created]);
        Alert.alert('Dodano', 'Nowy członek dodany.');
      }
      resetForm();
    } catch (error) {
      console.error('Błąd zapisu:', error);
      Alert.alert('Błąd', 'Nie udało się zapisać danych.');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteTeamMember(id);
      setTeamMembers(members => members.filter(m => m.IDteamMember !== id));
      Alert.alert('Usunięto', 'Członek drużyny został usunięty.');
    } catch (error) {
      console.error('Błąd usuwania:', error);
      Alert.alert('Błąd', 'Nie udało się usunąć członka.');
    }
  };

  const handleEdit = (member: TeamMember) => {
    setIDuser(member.IDuser);
    setIDteam(member.IDteam);
    setJoinDate(member.joinDate.split('T')[0]);
    setEditingMember(member);
    setIsFormVisible(true);
  };

  const renderMember = (member: TeamMember) => {
    const user = users.find(u => u.id === member.IDuser);
    const team = teams.find(t => t.id === member.IDteam);

    return (
      <View style={styles.itemBox} key={member.IDteamMember}>
        <Text style={styles.itemTitle}>Member: {user?.lastName}</Text>
        <Text style={styles.itemDetail}>👥 Team: {team?.teamName}</Text>
        <Text style={styles.itemDetail}>📅 Joined: {member.joinDate?.split('T')[0]}</Text>
        <View style={styles.buttonContainer}>
          <View style={styles.buttonSpacing}>
            <Button title="Edytuj" onPress={() => handleEdit(member)} />
          </View>
          <View style={styles.buttonSpacing}>
            <Button title="Usuń" color="#d9534f" onPress={() => handleDelete(member.IDteamMember)} />
          </View>
        </View>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.sectionTitle}>👤 Członkowie drużyn</Text>

      {isFormVisible ? (
        <View style={styles.formContainer}>
          <Text style={styles.itemDetail}>Wybierz użytkownika:</Text>
          <Picker selectedValue={IDuser} onValueChange={(value) => setIDuser(value)}>
            <Picker.Item label="-- wybierz --" value="" />
            {users.map(user => (
              <Picker.Item key={user.id} label={`${user.firstName} ${user.lastName}`} value={user.id} />
            ))}
          </Picker>

          <Text style={styles.itemDetail}>Wybierz drużynę:</Text>
          <Picker selectedValue={IDteam} onValueChange={(value) => setIDteam(value)}>
            <Picker.Item label="-- wybierz --" value="" />
            {teams.map(team => (
              <Picker.Item key={team.id} label={team.teamName} value={team.id} />
            ))}
          </Picker>

          <TextInput
            style={styles.input}
            placeholder="Data dołączenia (YYYY-MM-DD)"
            value={joinDate}
            onChangeText={setJoinDate}
          />

          <View style={styles.formButtons}>
            <View style={styles.buttonSpacing}>
              <Button title="Zapisz" onPress={handleAddOrUpdate} />
            </View>
            <View style={styles.buttonSpacing}>
              <Button title="Anuluj" color="#6c757d" onPress={resetForm} />
            </View>
          </View>
        </View>
      ) : (
        <View style={styles.addButton}>
          <Button title="Dodaj nowego członka" onPress={() => setIsFormVisible(true)} />
        </View>
      )}

      {teamMembers.map(renderMember)}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16 },
  sectionTitle: { fontSize: 22, fontWeight: 'bold', marginTop: 20, marginBottom: 10, color: '#333' },
  addButton: { marginBottom: 20 },
  formContainer: { marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  formButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonSpacing: {
    flex: 1,
    marginHorizontal: 5,
  },
  itemBox: { backgroundColor: '#f8f8f8', borderRadius: 8, padding: 14, marginBottom: 12 },
  itemTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 8 },
  itemDetail: { fontSize: 16, color: '#555', marginBottom: 4 },
  buttonContainer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
});

export default TeamMemberListScreen;
