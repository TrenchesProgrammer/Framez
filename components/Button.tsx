import { View, Text, Pressable, StyleSheet } from 'react-native'
import React from 'react'
import { hp, wp } from '@/helpers/common'
import { theme } from '../constants/theme'
interface ButtonProps{
    buttonStyle?: object,
    textStyle?: object,
    title: string,
    onPress?: ()=>void,
    loading?: boolean,
    hasShadow?: boolean
}

const Button = ({
    buttonStyle,
    textStyle,
    title,
    onPress=()=>{},
    loading = false,
    hasShadow = true
}: ButtonProps) => {
    const shadowStyle={

    }
  return (
    <Pressable onPress={onPress} style={StyleSheet.button, buttonStyle , hasShadow && shadowStyle}>
      <Text style={StyleSheet.text, textStyle}>{title}</Text>
    </Pressable>
  )
}

export default Button

const styles = StyleSheet.create({
    button:{
        backgroundColor: theme.colors.primary,
        height: wp(6.6),
        justifyContent:'center',
        alignItems:'center',
        borderCurve: 'continuous',
        borderRadius: theme.radius.xl
    },
    text:{
        fontSize: hp(2.5),
        color: 'white',
        fontWeight: theme.fonts.bold
    }
})