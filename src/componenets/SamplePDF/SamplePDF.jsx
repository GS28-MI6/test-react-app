import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "transparent",
  },
  section: {
    borderRadius: 10,
    border: "1px solid black",
    width: "100%",
    height: "100%",
    backgroundColor: "white",
    display: "grid",
    gridTemplateRows: "repeat(3,1fr)",
    overflow: "hidden",
  },
  header: {
    display: "grid",
    gridTemplateRows: "2fr 1fr",
    width: "100%",
    height: "100%",
  },
  title: {
    width: "93%",
    height: "90%",
    backgroundColor: "black",
    color: "white",
    textAlign: "center",
    fontSize: "16px",
    margin: "auto",
    marginTop: "3px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  subtitle: {
    width: "100%",
    height: "100%",
    color: "grey",
    textAlign: "center",
    fontSize: "12px",
  },
  info: {
    display: "grid",
    gridTemplateRows: "repeat(2,1fr)",
    width: "100%",
    height: "100%",
  },
  nombre: {
    width: "100%",
    height: "100%",
    color: "black",
    textAlign: "center",
    fontSize: "16px",
  },
  tipo: {
    width: "100%",
    height: "100%",
    color: "grey",
    textAlign: "center",
    fontSize: "16px",
    borderColor: "grey",
    borderWidth: "1px 0 1px 0",
    borderStyle: "solid",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    textAlign: "center",
    fontSize: "16px",
  },
});

// Create Document Component
const SamplePDF = () => (
  <Document>
    <Page
      size={[220, 142]}
      style={styles.page}
      renderAnnotationLayer={false}
      renderTextLayer={false}
    >
      <View style={styles.section}>
        <View style={styles.header}>
          <View style={styles.title}>
            <Text>FULLTEX</Text>
          </View>
          <View style={styles.subtitle}>
            <Text>REVESTIMIENTO TEXTURADO</Text>
          </View>
        </View>
        <View style={styles.info}>
          <View style={styles.nombre}>
            <Text>#LT GRIS INTERMEDIO</Text>
          </View>
          <View style={styles.tipo}>
            <Text>LATEX PROFESIONAL</Text>
          </View>
        </View>
        <View style={styles.footer}>
          <Text>MUESTRA</Text>
        </View>
      </View>
    </Page>
  </Document>
);

export default SamplePDF;
