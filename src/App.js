import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Button, Container, Modal, ModalBody, ModalHeader, FormGroup, ModalFooter } from 'reactstrap';
import React from 'react';

const data = [
  { id: 1, personaje: "Naruto", anime: "Naruto" },
  { id: 2, personaje: "Goku", anime: "Dragon Ball" },
  { id: 3, personaje: "Pikachu", anime: "Pokemon" },
  { id: 4, personaje: "Sakura", anime: "Sakura Card Captor" },
  { id: 5, personaje: "Zatch Bell", anime: "Zatch Bell" },
  { id: 6, personaje: "Mimi", anime: "Digimon" },
]

class App extends React.Component {
  state = {
    data: data,
    form : {
      id: '',
      personaje: '',
      anime: ''
    },
    modalInsertar: false,
    modalEditar: false,
  };

  handleChange = (e) => {
    this.setState({
      form: {
        ...this.state.form, 
        [e.target.name]: e.target.value,
      },
    });
  };

  mostrarModalInsertar(){
    this.setState({modalInsertar: true});
  }

  ocultarModalInsertar(){
    this.setState({modalInsertar: false});
  }

  insertarPersonaje() {
    var valorNuevo = {...this.state.form};
    valorNuevo.id = this.state.data.length+1;
    var lista =  this.state.data;
    lista.push(valorNuevo);
    this.setState({data: lista, modalInsertar: false});
  }

  mostrarModalEditar(registro){
    this.setState({modalEditar: true, form: registro});
  }

  ocultarModalEditar(){
    this.setState({modalEditar: false});
  }

  editarPersonaje(dato) {
    var contador = 0;
    var lista = this.state.data;
    lista.forEach((registro) => {
      if(dato.id === registro.id){
        lista[contador].personaje = dato.personaje;
        lista[contador].anime = dato.anime;
      }
      contador ++;
    });
    this.setState({data: lista, modalEditar: false});
  }

  eliminarPersonaje(dato) {
    var opcion = window.confirm("Esta seguro que desea eliminar el personaje? "+dato.id);
    if (opcion === true){
      var contador = 0;
      var lista = this.state.data;
      lista.forEach((registro) => {
        if (registro.id === dato.id) {
          lista.splice(contador, 1);
        }
        contador ++;
      });
      this.setState({data: lista});
    }
  }

  render() {
    return (
      <>
      <Container>
        <br />
        <Button color = "success" onClick={() => this.mostrarModalInsertar()} > Insertar nuevo personaje </Button>
        <br />
        <br />

        <Table>
          <thead>
            <tr>
              <th> Id </th>
              <th> Personaje </th>
              <th> Anime </th>
              <th> Acciones </th>
            </tr>
          </thead>
          <tbody> 
            {this.state.data.map((data) => (
              <tr>
                <td> {data.id} </td>
                <td> {data.personaje} </td>
                <td> {data.anime} </td>
                <td> <Button color="primary" onClick={() => this.mostrarModalEditar(data)}> Editar </Button> </td> 
                <td> <Button color="danger" onClick={() => this.eliminarPersonaje(data)}> Eliminar </Button> </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>

      <Modal isOpen={this.state.modalInsertar}>
        <ModalHeader>
          <div>
            <h3> Insertar Registro </h3>
          </div>
        </ModalHeader>

        <ModalBody>
          <FormGroup>
            <label> Id: </label> 
            <input className="form-control" readOnly type="text" value={this.state.data.length+1}/>
          </FormGroup>

          <FormGroup>
            <label> Personaje: </label>
            <input className="form-control" name="personaje" type="text" onChange={this.handleChange} />
          </FormGroup>

          <FormGroup>
            <label> Anime: </label>
            <input className="form-control" name="anime" type="text" onChange={this.handleChange}/>
          </FormGroup>
        </ModalBody>

        <ModalFooter>
          <Button color="primary" onClick={()=>this.insertarPersonaje()}> Insertar </Button>
          <Button color="danger" onClick={()=>this.ocultarModalInsertar()}> Cancelar </Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={this.state.modalEditar}>
        <ModalHeader>
          <div>
            <h3> Editar Registro </h3>
          </div>
        </ModalHeader>

        <ModalBody>
          <FormGroup>
            <label> Id: </label> 
            <input className="form-control" readOnly type="text" value={this.state.form.id} />
          </FormGroup>

          <FormGroup>
            <label> Personaje: </label>
            <input className="form-control" name="personaje" type="text" onChange={this.handleChange} value={this.state.form.personaje} />
          </FormGroup>

          <FormGroup>
            <label> Anime: </label>
            <input className="form-control" name="anime" type="text" onChange={this.handleChange} value={this.state.form.anime}/>
          </FormGroup>
        </ModalBody>

        <ModalFooter>
          <Button color="primary" onClick={() => this.editarPersonaje(this.state.form)}> Editar </Button>
          <Button color="danger" onClick={()=>this.ocultarModalEditar()} > Cancelar </Button>
        </ModalFooter>
      </Modal>
    </>    
    )
  }
}

export default App;
