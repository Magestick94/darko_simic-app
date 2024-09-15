import * as React from 'react';
import { useForm } from 'react-hook-form';

import { Box, Button, CardMedia, Container, Grid, IconButton, MenuItem, TextField, Tooltip } from "@mui/material";
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import ImageSearchIcon from '@mui/icons-material/ImageSearch';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditNoteIcon from '@mui/icons-material/EditNote';

import useData from "../hooks/useData";
import * as firestore from '../firebase/firestore';

export default function AdminPage() {

  return(
    <Container>
      <h2>ADMIN PANEL</h2>
      <AdminTabs></AdminTabs>
    </Container>
  )
}

function AdminTabs() {
  const [tabValue, setTabValue] = React.useState('1');

  const handleTabChange = (event, newTabValue) => {
    setTabValue(newTabValue);
  };

  return (
    <Box sx={{ width: '100%', minHeight: '70vh', typography: 'body1' }}>
      <TabContext value={tabValue}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleTabChange} aria-label="lab API tabs example">
            <Tab label="Auta" value="1" />
            <Tab label="Novosti" value="2" />
            <Tab label="Recenzije" value="3" />
            <Tab label="Proizvođači" value="4" />
            <Tab label="Kategorije" value="5" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <CarsTab></CarsTab>
        </TabPanel>
        <TabPanel value="2">Više o novosima uskoro...</TabPanel>
        <TabPanel value="3">Više o recenzijama uskoro...</TabPanel>
        <TabPanel value="4">Više o proizvođačima uskoro...</TabPanel>
        <TabPanel value="5">Više o kategorijama uskoro...</TabPanel>
      </TabContext>
    </Box>
  );
}

function CarsTab() {
  const defaultCarValues = {
    id:  "",
    bodyType: "",
    make: "",
    model: "",
    fuelType: "",
    gearType: "",
    power: "",
    year: "",
    desc: "",
    imgURL: "",
    price: ""
  };

  const { bodyTypes } = useData('bodyTypes');
  const { fuelTypes } = useData('fuelTypes');
  const { gearTypes } = useData('gearTypes');
  const { makes } = useData('makes');

  const [cars, setCars] = React.useState([]);
  const [openCarModal, setOpenCarModal] = React.useState(false);
  
  const { register, getValues, reset, handleSubmit } = useForm({ defaultValues: defaultCarValues });

  const getCarsData = () => {
    firestore.getDocuments('cars').then((docs) => setCars(docs.sort((a,b)=>(a.name > b.name) ? 1 : (a.name < b.name) ? -1 : 0)));
  }
  getCarsData();

  const resetCar = (defaultCarValues) => {
    reset(defaultCarValues);
  }

  const onAddCar = () => {
    reset(defaultCarValues);
    setOpenCarModal(true);
  }
  
  const onEditCar = (selectedCar) => {
    reset(selectedCar);
    setOpenCarModal(true);
  }
  
  const onDeleteCar = (selectedCar) => {
    // eslint-disable-next-line no-restricted-globals
    const confirmation = confirm(
      "Da li ste sigurni da zelite da obrisete ovo vozilo?"
    );

    if (confirmation) {
      firestore.deleteDocument("cars", selectedCar.id);
      getCarsData();
    }
  }

  const onSubmitCar = (carData) => {
    if (carData.id) {
      const carDataId = carData.id;
      delete carData.id;
      firestore.editDocument("cars", carDataId, carData);
    } else {
      delete carData.id;
      firestore.addDocument("cars", carData);
    }
    getCarsData();
    setOpenCarModal(false);
    resetCar();
  };

  return (
    <>
      <Box pb={2} display="flex" justifyContent="end">
        <Button onClick={()=>onAddCar()} variant="outlined">Add new vehicle</Button>
        <Modal
          open={openCarModal}
          onClose={()=>setOpenCarModal(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={{
            position: 'absolute',
            top: '40%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 700,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            borderRadius: "10",
            boxShadow: 24,
            p: 4,
          }}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Vehicle data:
            </Typography>
            <Box component="form" onSubmit={handleSubmit(onSubmitCar)} noValidate sx={{ mt: 1 }}>
              <Grid container spacing={1}>
                <Grid item xs={12} md={6} display="flex" flexDirection="column">
                  <TextField
                    id="bodyType"
                    select
                    label="Tip karoserije"
                    value={getValues("bodyType")}
                    {...register("bodyType")}
                    style={{marginTop: "10px"}}
                  >
                    {bodyTypes?.map((option) => (
                      <MenuItem key={option.id} value={option.type}>
                        {option.type}
                      </MenuItem>
                    ))}
                  </TextField>
                  <TextField my={2}
                    id="make"
                    select
                    label="Proizvođač"
                    value={getValues("make")}
                    {...register("make")}
                    style={{marginTop: "10px"}}
                  >
                    {makes.length && makes.map((option) => (
                      <MenuItem key={option.id} value={option.name}>
                        {option.name}
                      </MenuItem>
                    ))}
                  </TextField>
                  <TextField my={2}
                    id="model"
                    name="model"
                    label="Model"
                    type="text"
                    value={getValues("model")}
                    {...register("model")}
                    style={{marginTop: "10px"}}
                  />
                  <TextField
                    id="fuelType"
                    select
                    label="Pogon"
                    value={getValues("fuelType")}
                    {...register("fuelType")}
                    style={{marginTop: "10px"}}
                  >
                    {fuelTypes.map((option) => (
                      <MenuItem key={option.id} value={option.type}>
                        {option.type}
                      </MenuItem>
                    ))}
                  </TextField>
                  <TextField
                    id="gearType"
                    select
                    label="Menjač"
                    value={getValues("gearType")}
                    {...register("gearType")}
                    style={{marginTop: "10px"}}
                  >
                    {gearTypes.map((option) => (
                      <MenuItem key={option.id} value={option.type}>
                        {option.type}
                      </MenuItem>
                    ))}
                  </TextField>
                  <TextField my={2}
                    id="power"
                    name="power"
                    label="Snaga"
                    type="text"
                    value={getValues("power")}
                    {...register("power")}
                    style={{marginTop: "10px"}}
                  />
                </Grid>
                <Grid item xs={12} md={6} display="flex" flexDirection="column">
                  <TextField my={2}
                    id="year"
                    name="year"
                    label="Godina"
                    type="text"
                    value={getValues("year")}
                    {...register("year")}
                    style={{marginTop: "10px"}}
                  />
                  <TextField my={2}
                    id="price"
                    name="price"
                    label="Cena"
                    type="text"
                    value={getValues("price")}
                    {...register("price")}
                    style={{marginTop: "10px"}}
                  />
                  <TextField
                    id="desc"
                    name="desc"
                    label="Opis"
                    value={getValues("desc")}
                    {...register("desc")}
                    multiline
                    rows={4}
                    style={{marginTop: "8px"}}
                  />
                  <TextField
                    id="imgURL"
                    name="imgURL"
                    label="Image URL"
                    value={getValues("imgURL")}
                    {...register("imgURL")}
                    multiline
                    rows={4}
                    style={{marginTop: "8px"}}
                  />
                </Grid>
              </Grid>
              <Box pt={2} display="flex" justifyContent="end">
                <Button type="submit" variant="outlined" color="success">Sačuvaj</Button>
              </Box>
            </Box>
          </Box>
        </Modal>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Proizvođač</TableCell>
              <TableCell>Model</TableCell>
              <TableCell>Tip karoserije</TableCell>
              <TableCell>Pogon</TableCell>
              <TableCell>Tip menjača</TableCell>
              <TableCell>Snaga</TableCell>
              <TableCell>Godina</TableCell>
              <TableCell>Opis</TableCell>
              <TableCell>Slika</TableCell>
              <TableCell>Cena</TableCell>
              <TableCell>Promene</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cars.map((car) => (
              <TableRow
                key={car.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {car.make}
                </TableCell>
                <TableCell>{car.model}</TableCell>
                <TableCell>{car.bodyType}</TableCell>
                <TableCell>{car.fuelType}</TableCell>
                <TableCell>{car.gearType}</TableCell>
                <TableCell>{car.power}</TableCell>
                <TableCell>{car.year}</TableCell>
                <TableCell>
                  <Tooltip title={car.desc}>
                    <IconButton>
                      <AssignmentOutlinedIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
                <TableCell>
                  <Tooltip title={
                    <CardMedia
                      component="img"
                      sx={{ width: 250, height: 250 }}
                      image={car.imgURL}
                      alt="car image"
                    />}
                  >
                    <IconButton>
                      <ImageSearchIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
                <TableCell>{car.price}</TableCell>
                <TableCell>
                  <Tooltip title="Delete car">
                    <IconButton onClick={()=>onDeleteCar(car)}>
                      <DeleteOutlineIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Edit car">
                    <IconButton onClick={()=>onEditCar(car)}>
                      <EditNoteIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}