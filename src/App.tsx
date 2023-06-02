import React, { useState } from 'react';
import axios from 'axios';
import 'antd/dist/reset.css';
import './App.css';
import { Table, Input, Button, Card } from 'antd';

const { Meta } = Card;

interface Usuario {
  nombre: string;
  numeroIdentificacion: string;
  provincia: string;
}

const provincias = [
  { codigo: '01', nombre: 'Azuay' },
  { codigo: '02', nombre: 'Bolívar' },
  { codigo: '03', nombre: 'Carchi' },
  { codigo: '04', nombre: 'Cañar' },
  { codigo: '05', nombre: 'Chimborazo' },
  { codigo: '06', nombre: 'Cotopaxi' },
  { codigo: '07', nombre: 'El Oro' },
  { codigo: '08', nombre: 'Esmeraldas' },
  { codigo: '09', nombre: 'Guayas' },
  { codigo: '10', nombre: 'Imbabura' },
  { codigo: '11', nombre: 'Loja' },
  { codigo: '12', nombre: 'Los Ríos' },
  { codigo: '13', nombre: 'Manabí' },
  { codigo: '14', nombre: 'Morona Santiago' },
  { codigo: '15', nombre: 'Napo' },
  { codigo: '16', nombre: 'Pastaza' },
  { codigo: '17', nombre: 'Pichincha' },
  { codigo: '18', nombre: 'Tungurahua' },
  { codigo: '19', nombre: 'Zamora Chinchipe' },
  { codigo: '20', nombre: 'Galápagos' },
  { codigo: '21', nombre: 'Sucumbíos' },
  { codigo: '22', nombre: 'Orellana' },
  { codigo: '23', nombre: 'Santo Domingo de los Tsáchilas' },
  { codigo: '24', nombre: 'Santa Elena' },
];

function App() {
  const [apellidosNombres, setApellidosNombres] = useState('');
  const [usuariosEncontrados, setUsuariosEncontrados] = useState<Usuario[]>([]);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState<Usuario | null>(null);

  const obtenerInformacion = () => {
    const tiempo = Date.now();
    const apellidosNombresMayusculas = apellidosNombres.toUpperCase();
    const url = `https://srienlinea.sri.gob.ec/movil-servicios/api/v1.0/deudas/porDenominacion/${encodeURIComponent(
      apellidosNombresMayusculas
    )}/?tipoPersona=N&resultados=99&_=${tiempo}`;

    axios
      .get(url)
      .then(response => {
        const data: any[] = response.data; // Datos obtenidos de la API

        const usuarios: Usuario[] = data.map(usuario => ({
          nombre: usuario.nombreComercial,
          numeroIdentificacion: usuario.identificacion,
          provincia: obtenerProvincia(usuario.identificacion), // Agregar el campo provincia
        }));

        setUsuariosEncontrados(usuarios);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const obtenerProvincia = (numeroIdentificacion: string): string => {
    const codigoProvincia = numeroIdentificacion.substring(0, 2);
    const provinciaEncontrada = provincias.find(provincia => provincia.codigo === codigoProvincia);
    return provinciaEncontrada ? provinciaEncontrada.nombre : 'Provincia Desconocida';
  };

  const seleccionarUsuario = (usuario: Usuario) => {
    setUsuarioSeleccionado(usuario);
  };

  const columns = [
    {
      title: 'Nombre',
      dataIndex: 'nombre',
      key: 'nombre',
    },
    {
      title: 'Provincia',
      dataIndex: 'provincia',
      key: 'provincia',
    },
    {
      title: 'Acciones',
      key: 'acciones',
      render: (_: any, usuario: Usuario) => (
        <Button onClick={() => seleccionarUsuario(usuario)}>Seleccionar</Button>
      ),
    },
  ];

  function UserCard({ usuario }: { usuario: Usuario }) {
    return (
      <div className="user-card-container">
        <Card title="Información del Usuario" className="user-card">
          <Meta title={usuario.nombre} description={`Número de Identificación: ${usuario.numeroIdentificacion}`} />
          <p>Provincia: {usuario.provincia}</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="App">
      <h1>Obtener Información de Persona</h1>
      <Input
        value={apellidosNombres}
        onChange={e => setApellidosNombres(e.target.value)}
        placeholder="Ingrese apellidos y nombres o solo apellidos"
        className="input-search" // Agrega la clase CSS para la barra de búsqueda
      />
      <Button type="primary" onClick={obtenerInformacion} className="btn-search"> {/* Agrega la clase CSS para el botón de búsqueda */}
        Buscar
      </Button>
      <Table columns={columns} dataSource={usuariosEncontrados} className="table-users" /> {/* Agrega la clase CSS para la tabla de usuarios */}
      {usuarioSeleccionado && <UserCard usuario={usuarioSeleccionado} />}
    </div>
  );
}

export default App;


































