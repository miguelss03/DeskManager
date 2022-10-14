import React, { useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { VStack } from 'native-base';
import { Button } from '../components/Button';
import { Header } from '../components/Header';
import { Input } from '../components/Input';
import { Alert } from 'react-native';

export function Register() {
    const [isLoading, setIsLoading] = useState(false);
    const [patrimony, setPatrimony] = useState('');
    const [description, setDescription] = useState('');

    const navigation = useNavigation();

    function handleNewOrderRegisters() {
        if (!patrimony || !description) {
            return Alert.alert('Registrar', 'Preencha todos os campos.')
        }
        setIsLoading(true);

        firestore()
            .collection('orders')
            .add({
                patrimony,
                description,
                status: 'open',
                created_at: firestore.FieldValue.serverTimestamp()
            })
            .then(() => {
                Alert.alert("Solicitação", "Solicitação Registrada com sucesso.");
                navigation.goBack();
            })
            .catch((error) => {
                console.log(error);
                setIsLoading(false);
                return Alert.alert("Solicitação", "Não deu bom menor")
            });

    }

    return (
        <VStack flex={1} p={6} bg="gray.600">
            <Header title="Nova Solicitação" />

            <Input
                placeholder='Número do parimônio'
                onChangeText={setPatrimony}
                mt={4}
            />

            <Input
                placeholder='Descrição do problema'
                onChangeText={setDescription}
                flex={1}
                mt={5}
                multiline
                textAlignVertical='top'
            />

            <Button
                onPress={handleNewOrderRegisters}
                isLoading={isLoading}
                title="Cadastrar"
                mt={5}
            />
        </VStack>
    );
}