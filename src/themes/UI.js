import { Fonts, Colors } from "./";
import { moderateScale } from "../libs/scaling";

const card = {
    shadow: {
        shadowColor: "rgba(0, 0, 0, 0.03)",
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowRadius: 10,
        shadowOpacity: 1,
    },
    bottomShadow: {
        shadowColor: "rgba(178, 178, 178, 0.5)",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowRadius: 3,
        shadowOpacity: 1,
    },
    normal: {
        borderRadius: 4,
        backgroundColor: Colors.white,
        shadowColor: "rgba(0, 0, 0, 0.3)",
        elevation: 1,
        shadowOffset: {
            width: 0,
            height: 1
        },
        borderWidth: 1,
        borderColor: "#F1F4FB",
        shadowRadius: 1,
        shadowOpacity: 1,
    }
}

const button = {
    primary: {
        container: {
            height: 40,
            borderRadius: 20,
            justifyContent: 'center',
            alignItems: 'center',
        },
        text: {
            color: 'white',
            fontFamily: 'Montserrat-Medium'
        },
    }
}

const HRMCard = {
    borderRadius: 4,
    backgroundColor: Colors.white,
    shadowColor: "rgba(0, 0, 0, 0.3)",
    elevation: 1,
    shadowOffset: {
        width: 0,
        height: 1
    },
    borderWidth: 1,
    borderColor: "#F1F4FB",
    shadowRadius: 1,
    shadowOpacity: 1,
}

const title = {
    fontFamily: Fonts.type.bold,
    fontSize: moderateScale(24),
    lineHeight: moderateScale(29),
    fontWeight: "bold",
    color: Colors.black,
}

const devider = {
    width: '100%',
    height: 1,
    backgroundColor: Colors.grayShadow
}

export default {
    card,
    button,
    HRMCard,
    title,
    devider,
}
