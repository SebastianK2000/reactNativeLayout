import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, StyleSheet, Button, TextInput, Alert } from 'react-native';
import { getTeamMembers, createTeamMember, updateTeamMember, deleteTeamMember } from '../../../../services/api';

const TeamMemberListScreen = () => {
  interface TeamMember {
    IDteamMember: string;
    IDuser: string;
    IDteam: string;
    joinDate: string;
  }

  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
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
        setTeamMembers(members);
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
        setTeamMembers(teamMembers.map(m => (m.IDteamMember === editingMember.IDteamMember ? { ...payload, IDteamMember: editingMember.IDteamMember } : m)));
        Alert.alert('Zaktualizowano', 'Członek drużyny zaktualizowany.');
      } else {
        const created = await createTeamMember(payload);
        setTeamMembers([...teamMembers, created]);
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
      setTeamMembers(teamMembers.filter(m => m.IDteamMember !== id));
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

  const renderMember = (member: TeamMember) => (
    <View style={styles.itemBox} key={member.IDteamMember}>
      <Text style={styles.itemTitle}>Member: {member.IDuser || 'Brak użytkownika'}</Text>
      <Text style={styles.itemDetail}>👥 Team ID: {member.IDteam}</Text>
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

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.sectionTitle}>👤 Członkowie drużyn</Text>

      {isFormVisible ? (
        <View style={styles.formContainer}>
          <TextInput style={styles.input} placeholder="ID Użytkownika" value={IDuser} onChangeText={setIDuser} />
          <TextInput style={styles.input} placeholder="ID Drużyny" value={IDteam} onChangeText={setIDteam} />
          <TextInput style={styles.input} placeholder="Data dołączenia (YYYY-MM-DD)" value={joinDate} onChangeText={setJoinDate} />
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
