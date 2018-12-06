import {Platform, StyleSheet, Text, TouchableOpacity} from "react-native";
import {purple, white} from "../utils/colors";

export default function SubmitBtn({onPress, disabled = false, text = 'Create Deck'}) {
    return (
        <TouchableOpacity
            style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.androidSubmitBtn}
            onPress={onPress}
            disabled={disabled}>
            <Text style={styles.submitBtnText}>{text}</Text>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    androidSubmitBtn: {
        backgroundColor: purple,
        padding: 10,
        paddingRight: 30,
        paddingLeft: 30,
        height: 45,
        borderRadius: 2,
        alignSelf: 'flex-end',
        justifyContent: 'center',
        alignItems: 'center',
    },
    iosSubmitBtn: {
        backgroundColor: purple,
        padding: 10,
        borderRadius: 7,
        height: 45,
        marginRight: 40,
        marginLeft: 40,
    },
    submitBtnText: {
        color: white,
        fontSize: 22,
        textAlign: 'center',
    },
});
