import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, StyleSheet, Button, TextInput, Alert } from 'react-native';
import { getTeams, createTeam, updateTeam, deleteTeam } from '../../../../services/api';

const TeamListScreen = () => {
  interface Team {
    IDteam: string;
    teamName: string;
    creationAt: string;
  }

  const [teams, setTeams] = useState<Team[]>([]);
  const [editingTeam, setEditingTeam] = useState<Team | null>(null);

  const today = new Date().toISOString().split('T')[0];

  const [teamName, setTeamName] = useState('');
  const [creationAt, setCreationAt] = useState(today);
  const [isFormVisible, setIsFormVisible] = useState(false);

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

  const resetForm = () => {
    setTeamName('');
    setCreationAt(today);
    setEditingTeam(null);
    setIsFormVisible(false);
  };

  const handleAddOrUpdateTeam = async () => {
  if (!teamName || !creationAt) {
    Alert.alert('Błąd', 'Uzupełnij wszystkie pola');
    return;
  }

  const payload = {
    IDteam: editingTeam?.IDteam ?? 0,
    TeamName: teamName,
    CreatedAt: editingTeam?.creationAt || new Date().toISOString(),
    UpdatedAt: new Date().toISOString(),
  };

  try {
    if (editingTeam) {
      const updated = await updateTeam(editingTeam.IDteam, payload);
      setTeams(teams.map(t => (t.IDteam === updated.iDteam ? { ...updated, IDteam: updated.iDteam } : t)));
      Alert.alert('Zaktualizowano', 'Drużyna została zaktualizowana.');
    } else {
      const created = await createTeam(payload);
      setTeams([...teams, { ...created, IDteam: created.iDteam }]);
      Alert.alert('Dodano', 'Nowa drużyna została dodana.');
    }
    resetForm();
  } catch (error) {
    console.error('Błąd zapisu drużyny:', error);
    Alert.alert('Błąd', 'Nie udało się zapisać drużyny.');
  }
};


  const handleDeleteTeam = async (id: string) => {
    try {
      await deleteTeam(id);
      setTeams(teams.filter((item) => item.IDteam !== id));
      Alert.alert('Usunięto', 'Drużyna została usunięta.');
    } catch (err) {
      console.error('Błąd usuwania drużyny:', err);
      Alert.alert('Błąd', 'Nie udało się usunąć drużyny.');
    }
  };

  const handleEditTeam = (team: Team) => {
    setTeamName(team.teamName);
    setCreationAt(team.creationAt ? team.creationAt.split('T')[0] : today);
    setEditingTeam(team);
    setIsFormVisible(true);
  };

  const renderTeam = (item: Team) => (
    <View style={styles.itemBox} key={item.IDteam}>
      <Text style={styles.itemTitle}>Team: {item.teamName || 'No Name'}</Text>
      <Text style={styles.itemDetail}>📅 Created: {item.creationAt?.split('T')[0] || 'No Date'}</Text>
      <View style={styles.buttonContainer}>
        <View style={styles.buttonSpacing}>
          <Button title="Edytuj" onPress={() => handleEditTeam(item)} />
        </View>
        <View style={styles.buttonSpacing}>
          <Button title="Usuń" color="#d9534f" onPress={() => handleDeleteTeam(item.IDteam)} />
        </View>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.sectionTitle}>🏁 Drużyny</Text>

      {isFormVisible ? (
        <View style={styles.formContainer}>
          <TextInput style={styles.input} placeholder="Team Name" value={teamName} onChangeText={setTeamName} />
          <TextInput style={styles.input} placeholder="Creation Date (YYYY-MM-DD)" value={creationAt} onChangeText={setCreationAt} />

          <View style={styles.formButtons}>
            <View style={styles.buttonSpacing}>
              <Button title="Zapisz" onPress={handleAddOrUpdateTeam} />
            </View>
            <View style={styles.buttonSpacing}>
              <Button title="Anuluj" color="#6c757d" onPress={resetForm} />
            </View>
          </View>
        </View>
      ) : (
        <View style={styles.addButton}>
          <Button title="Dodaj nową drużynę" onPress={() => setIsFormVisible(true)} />
        </View>
      )}

      {teams.map(renderTeam)}
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

export default TeamListScreen;
