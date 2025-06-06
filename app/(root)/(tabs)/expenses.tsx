import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, StyleSheet, Button } from 'react-native';
import { getAccommodations, createAccommodation, updateAccommodation, deleteAccommodation } from '../../../services/api';
import AccommodationForm from './(expenses)/AccommodationsForm';

const AccommodationListScreen = () => {
  const [accommodations, setAccommodations] = useState<any[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingAccommodation, setEditingAccommodation] = useState<any>(null);

  useEffect(() => {
    const fetchAccommodations = async () => {
      try {
        const acc = await getAccommodations();
        setAccommodations(acc);
      } catch (err) {
        console.error(err);
      }
    };
    fetchAccommodations();
  }, []);

  const handleDeleteAccommodation = async (id?: string | number) => {
    if (!id) {
      console.error("Brak ID noclegu do usunięcia");
      return;
    }

    try {
      await deleteAccommodation(id);
      setAccommodations(accommodations.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Błąd usuwania:", error);
    }
  };

  const handleEditAccommodation = (accommodation: any) => {
    setEditingAccommodation(accommodation);
    setModalVisible(true);
  };

  const handleFormClose = () => {
    setEditingAccommodation(null);
    setModalVisible(false);
  };

const handleFormSubmit = async (formData: any) => {
  try {
    const payload = {
      IDaccommodation: editingAccommodation?.id ?? 0,
      Name: formData.name,
      Type: formData.type,
      Address: formData.address,
      Price: parseFloat(formData.price),
      CreatedAt: editingAccommodation?.createdAt || new Date().toISOString(),
      UpdatedAt: new Date().toISOString(),
    };

    if (editingAccommodation) {
      const updated = await updateAccommodation(editingAccommodation.id, payload);

      if (updated && updated.iDaccommodation !== undefined) {
        setAccommodations(prev =>
          prev.map(a =>
            a.id === updated.iDaccommodation
              ? { ...updated, id: updated.iDaccommodation }
              : a
          )
        );
      } else {
        console.warn('Brak danych z updateAccommodation');
      }
    } else {
      const created = await createAccommodation(payload);
      setAccommodations(prev => [...prev, { ...created, id: created.iDaccommodation }]);
    }

    handleFormClose();
  } catch (err) {
    console.error('Błąd podczas zapisu:', err);
  }
};


  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('pl-PL', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const renderAccommodation = (item: any) => (
    <View style={styles.itemBox} key={item.id}>
      <Text style={styles.itemTitle}>{item.name || 'Brak nazwy'}</Text>
      <Text style={styles.itemDetail}>📍 Adres: {item.address || 'Brak adresu'}</Text>
      <Text style={styles.itemDetail}>🏠 Typ: {item.type || 'Brak typu'}</Text>
      {item.price && <Text style={styles.itemDetail}>💰 Cena: {item.price} $</Text>}
      {item.date && <Text style={styles.itemDetail}>📅 Data: {formatDate(item.date)}</Text>}
      <Text style={styles.itemDetail}>👤 Stworzone przez: {item.createdBy}</Text>

      <View style={styles.buttonContainer}>
        <View style={styles.buttonSpacing}>
          <Button title="Edytuj" onPress={() => handleEditAccommodation(item)} />
        </View>
        <View style={styles.buttonSpacing}>
          <Button title="Usuń" color="#d9534f" onPress={() => handleDeleteAccommodation(item.id)} />
        </View>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.sectionTitle}>🏨 Zakwaterowania</Text>
      <View style={styles.addButton}>
        <Button title="Dodaj nowe zakwaterowanie" onPress={() => setModalVisible(true)} />
      </View>
      {accommodations.map(renderAccommodation)}
      {modalVisible && (
        <AccommodationForm
          visible={modalVisible}
          initialData={editingAccommodation}
          onClose={handleFormClose}
          onSubmit={handleFormSubmit}
        />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16 },
  sectionTitle: { fontSize: 22, fontWeight: 'bold', marginTop: 20, marginBottom: 10, color: '#333' },
  addButton: { marginBottom: 20 },
  itemBox: { backgroundColor: '#f8f8f8', borderRadius: 8, padding: 14, marginBottom: 12 },
  itemTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 8 },
  itemDetail: { fontSize: 16, color: '#555', marginBottom: 4 },
  buttonContainer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
  buttonSpacing: { flex: 1, marginHorizontal: 5 },
});

export default AccommodationListScreen;
