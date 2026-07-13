import React from 'react';
import { Text as RNText, StyleSheet } from 'react-native';
import theme from '../theme';

const styles = StyleSheet.create({
  text: {
    color: theme.colors.textPrimary,
    fontSize: theme.fontSizes.body,
    fontWeight: theme.fontWeights.normal,
  },
  bold: { fontWeight: theme.fontWeights.bold },
  secondary: { color: theme.colors.textSecondary },
  title: { fontSize: theme.fontSizes.title, fontWeight: theme.fontWeights.bold },
});

const TextModificado = ({ children, bold, secondary, title, style, ...props }) => {
  const textStyles = [
    styles.text,
    bold && styles.bold,
    secondary && styles.secondary,
    title && styles.title,
    style, // Permite pisar estilos si fuera necesario
  ];

  return <RNText style={textStyles} {...props}>{children}</RNText>;
};

export default TextModificado;