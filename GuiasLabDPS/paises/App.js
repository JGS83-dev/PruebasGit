import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Alert, StyleSheet, Text, View } from "react-native";
import Formulario from "./src/componentes/Formulario";
import Pais from "./src/componentes/Pais";

export default function App() {
  const [busqueda, setBusqueda] = useState({ pais: "" });
  const [consultar, setconsultar] = useState(false);
  const [resultado, setresultado] = useState({});

  useEffect(() => {
    const { pais } = busqueda;
    const consultarPais = async () => {
      if (consultar) {
        const url = `https://servicodados.ibge.gov.br/api/v1/paises/${pais}`;
        try {
          console.log("Url de Fetch:", url);
          const respuesta = await fetch(url);
          console.log("Resultado Fetch:", respuesta);
          const resultado = await respuesta.json();
          setresultado(resultado);
          setconsultar(false);
        } catch (error) {
          console.log("Error al hacer fetch:", error);
          mostrarAlerta();
        }
      }
    };
    consultarPais();
  }, [consultar]);

  const mostrarAlerta = () => {
    Alert.alert("Error", "No hay resultado intenta con otra ciudad o país"),
      [{ Text: "Ok" }];
  };

  return (
    <View style={styles.app}>
      <StatusBar style="auto" />
      <View style={styles.contenido}>
        <Formulario
          busqueda={busqueda}
          guardarBusqueda={setBusqueda}
          guardarConsulta={setconsultar}
        />
        <Pais resultado={resultado} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: "rgb(71,149,212)",
    justifyContent: "center",
  },
  contenido: {
    margin: "2.5%",
  },
});
