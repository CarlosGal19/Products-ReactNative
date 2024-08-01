import { FC } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

const Amount: FC<{ max: number, amount: number, setAmount: (amount: number) => void }> = ({ max, amount, setAmount }) => {

    const handleChange = (text: string) => {
        if (/^\d*$/.test(text)) {
            const num = Number(text);
            if (num <= max) {
                setAmount(num);
                return;
            }
            setAmount(max);
        }
    };

    const handleBlur = () => {
        if (amount === 0) {
            setAmount(1);
            return;
        }
    }

    const increment = () => {
        setAmount(amount < max ? amount + 1 : amount);
    };

    const decrement = () => {
        setAmount(amount > 1 ? amount - 1 : 1);
    };

    return (
        <View style={styles.container}>
            <Button title="-" onPress={decrement} />
            <TextInput
                style={styles.input}
                value={`${amount}`}
                keyboardType="numeric"
                onChangeText={handleChange}
                onBlur={handleBlur}
            />
            <Button title="+" onPress={increment} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        width: 100,
        height: 40,
        textAlign: 'center',
        fontSize: 20,
        marginHorizontal: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 100,
    },
});

export default Amount;
