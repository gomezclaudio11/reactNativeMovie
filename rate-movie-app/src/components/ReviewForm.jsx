import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import TextModificado from './TextModificado';
import theme from '../theme';

// 🚀 Esquema de validación con Yup
const ReviewSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, '¡Tu nombre es muy corto!')
    .required('El nombre es obligatorio'),
  rating: Yup.number()
    .min(1, 'La nota mínima es 1')
    .max(5, 'La nota máxima es 5')
    .required('Debes poner una nota'),
  comment: Yup.string()
    .min(10, 'Escribe un comentario un poco más largo (mínimo 10 letras)')
    .required('El comentario no puede estar vacío'),
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.surface,
    padding: 15,
    borderRadius: 12,
    marginTop: 20,
  },
  title: {
    fontSize: theme.fontSizes.subheading,
    fontWeight: theme.fontWeights.bold,
    marginBottom: 15,
  },
  input: {
    backgroundColor: theme.colors.background,
    color: '#ffffff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 5,
    fontSize: theme.fontSizes.body,
  },
  errorText: {
    color: theme.colors.primary, // Color rojo/alerta de tu tema
    fontSize: 12,
    marginBottom: 10,
    marginLeft: 4,
  },
  button: {
    backgroundColor: theme.colors.primary,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
});

const ReviewForm = ({ movieId, onReviewSubmit }) => {
  return (
    <View style={styles.container}>
      <TextModificado style={styles.title}>Deja tu Opinión</TextModificado>

      <Formik
        initialValues={{ name: '', rating: '', comment: '' }}
        validationSchema={ReviewSchema}
        onSubmit={async (values, { resetForm }) => {
          // Le pasamos los datos limpios a la función que los va a guardar
          await onReviewSubmit({
            id: Date.now().toString(), // ID único para el comentario
            movieId,
            name: values.name,
            rating: Number(values.rating),
            comment: values.comment,
            date: new Date().toLocaleDateString('es-AR'),
          });
          resetForm(); // Limpia los campos del formulario tras enviar
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isSubmitting }) => (
          <View>
            {/* Campo Nombre */}
            <TextInput
              style={styles.input}
              placeholder="Tu nombre"
              placeholderTextColor={theme.colors.textSecondary}
              onChangeText={handleChange('name')}
              onBlur={handleBlur('name')}
              value={values.name}
            />
            {touched.name && errors.name && (
              <TextModificado style={styles.errorText}>{errors.name}</TextModificado>
            )}

            {/* Campo Calificación */}
            <TextInput
              style={styles.input}
              placeholder="Calificación (1 al 5)"
              placeholderTextColor={theme.colors.textSecondary}
              keyboardType="numeric"
              maxLength={1}
              onChangeText={handleChange('rating')}
              onBlur={handleBlur('rating')}
              value={values.rating}
            />
            {touched.rating && errors.rating && (
              <TextModificado style={styles.errorText}>{errors.rating}</TextModificado>
            )}

            {/* Campo Comentario */}
            <TextInput
              style={[styles.input, { minHeight: 80, textAlignVertical: 'top' }]}
              placeholder="¿Qué te pareció la película?..."
              placeholderTextColor={theme.colors.textSecondary}
              multiline
              numberOfLines={4}
              onChangeText={handleChange('comment')}
              onBlur={handleBlur('comment')}
              value={values.comment}
            />
            {touched.comment && errors.comment && (
              <TextModificado style={styles.errorText}>{errors.comment}</TextModificado>
            )}

            {/* Botón de Envío */}
            <TouchableOpacity 
              style={styles.button} 
              onPress={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <ActivityIndicator color="#ffffff" />
              ) : (
                <TextModificado bold style={{ color: '#ffffff' }}>Publicar Reseña</TextModificado>
              )}
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </View>
  );
};

export default ReviewForm;