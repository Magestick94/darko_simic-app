import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import { Box, Container, Grid, IconButton, MenuItem, Modal, Slider, TextField, Tooltip, Typography } from "@mui/material";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

import CarCard from "../shared/CarCard";
import useData from "../hooks/useData";

export default function CarsPage() {
  const [searchParams, ] = useSearchParams();

  const { cars } = useData('cars');
  const { makes } = useData('makes');
  const { bodyTypes } = useData('bodyTypes');
  const { fuelTypes } = useData('fuelTypes');
  const { gearTypes } = useData('gearTypes');

  const [openCarModal, setOpenCarModal] = React.useState(false);
  const [filterSearch, setFilterSearch] = React.useState("");
  const [filterMake, setFilterMake] = React.useState("");
  const [filterBody, setFilterBody] = React.useState("");
  const [filterGear, setFilterGear] = React.useState("");
  const [filterFuel, setFilterFuel] = React.useState("");
  const [filterPrice, setFilterPrice] = React.useState([10000, 200000]);
  const [selectedCar, setSelectedCar] = React.useState({
    id:  "",
    make: "",
    model: "",
    bodyType: "",
    fuelType: "",
    gearType: "",
    power: "",
    year: "",
    desc: "",
    imgURL: "",
    price: ""
  });

  let filteredCars = cars;

  const filterCars = () => {
    if (filterMake) filteredCars = filteredCars.filter(car => car.make === filterMake);
    if (filterBody) filteredCars = filteredCars.filter(car => car.bodyType === filterBody);
    if (filterGear) filteredCars = filteredCars.filter(car => car.gearType === filterGear);
    if (filterFuel) filteredCars = filteredCars.filter(car => car.fuelType === filterFuel);

    filteredCars = filteredCars.filter(car => {
      let numb = car.price.match(/\d/g);
      numb = numb.join("");
      if (filterPrice[0] <= +numb && +numb <= filterPrice[1]) return car;
      return null;
    });

    filteredCars = filteredCars.filter(car => car.make.toLowerCase().includes(filterSearch) || car.model.toLowerCase().includes(filterSearch));
  }
  filterCars();

  useEffect(() => {
    const makeParam = searchParams.get("make");
    if (makeParam) setFilterMake(makeParam);

    const categoryParam = searchParams.get("category");
    if (categoryParam) {
      if (categoryParam === "Electric" || categoryParam === "Hybrid") {
        setFilterFuel(categoryParam);
      } else {
        setFilterBody(categoryParam);
      }
    }
  }, [searchParams]);
  
  
  const handlePriceChange = (event, newPriceValue) => {
    setFilterPrice(newPriceValue);
  };
  
  // const handleApplyFilter = () => {
  //   console.log(filterMake)
  //   console.log(filterPrice)
  // }

  const onClearFilter = () => {
    setFilterSearch("");
    setFilterMake("");
    setFilterBody("");
    setFilterGear("");
    setFilterFuel("");
    setFilterPrice([10000, 200000]);
  }

  const onSelectCar = (selectedCar) => {
    setSelectedCar(selectedCar);
    setOpenCarModal(true);
  }

  return(
    <Container style={{paddingBottom: "30px"}}>
      <h2>Automobili</h2>
      <Grid container spacing={5}>
        <Grid item xs={4}>
          <Box display="flex" flexDirection="column" sx={{border: "1px solid #ccc", padding: "0px 20px 20px"}}>
            <Box pt={4} display="flex" justifyContent="space-between" alignItems="center">
            <h3>Filter:</h3>
            <Tooltip title="Clear all filters">
              <IconButton onClick={()=>onClearFilter()}>
                <HighlightOffIcon />
              </IconButton>
            </Tooltip>
            </Box>
            <TextField
              id="filterSearch"
              label="Pretraži"
              type="search"
              value={filterSearch}
              sx={{width: "100%"}}
              onChange={(event)=>setFilterSearch(event.target.value)} />
            <TextField
              size="small"
              id="filterMake"
              select
              label="Proizvođač"
              value={filterMake}
              onChange={(event)=>setFilterMake(event.target.value)}
              style={{marginTop: "30px"}}
            >
              {makes.map((option) => (
                <MenuItem key={option.id} value={option.name}>
                  {option.name}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              size="small"
              id="filterBody"
              select
              label="Tip karoserije"
              value={filterBody}
              onChange={(event)=>setFilterBody(event.target.value)}
              style={{marginTop: "10px"}}
            >
              {bodyTypes.map((option) => (
                <MenuItem key={option.id} value={option.type}>
                  {option.type}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              size="small"
              id="filterFuel"
              select
              label="Pogon"
              value={filterFuel}
              onChange={(event)=>setFilterFuel(event.target.value)}
              style={{marginTop: "10px"}}
            >
              {fuelTypes.map((option) => (
                <MenuItem key={option.id} value={option.type}>
                  {option.type}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              size="small"
              id="filterGear"
              select
              label="Tip menjača"
              value={filterGear}
              onChange={(event)=>setFilterGear(event.target.value)}
              style={{marginTop: "10px"}}
            >
              {gearTypes.map((option) => (
                <MenuItem key={option.id} value={option.type}>
                  {option.type}
                </MenuItem>
              ))}
            </TextField>
            <h4>Raspon cena:</h4>
            <Slider
              getAriaLabel={() => 'Price range'}
              min={100}
              max={300000}
              value={filterPrice}
              onChange={handlePriceChange}
              valueLabelDisplay="auto"
            />
            {/* <Box pt={7} display="flex" justifyContent="center">
              <Button type="button" variant="outlined" onClick={handleApplyFilter}>Apply filter</Button>
            </Box> */}
          </Box>
        </Grid>
        <Grid item xs={8}>
          {filteredCars.map(car => {
            return (
              <Box key={car.id} sx={{cursor: 'pointer'}} onClick={()=>onSelectCar(car)}>
                <CarCard car={car}></CarCard>
              </Box>
            )
          })}
        </Grid>
      </Grid>
      <Modal
        id="carModal"
        open={openCarModal}
        onClose={()=>setOpenCarModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{
          position: 'absolute',
          top: '45%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 1000,
          bgcolor: 'background.paper',
          border: '2px solid #000',
          borderRadius: "10",
          boxShadow: 24,
          p: 4,
        }}>
          <Box display='flex'>
            <Box pr={2} width="350px">
              <Typography variant="h4" component="h2">
                {(selectedCar.make ?? '') + ', ' + (selectedCar.model)}
              </Typography>
              <Typography variant="h6" color="text.secondary" component="h2">
                <span>Body type:</span> {selectedCar.bodyType}
              </Typography>
              <Typography variant="h6" color="text.secondary" component="h2">
                <span>Power:</span> {selectedCar.power}
              </Typography>
              <Typography variant="h6" color="text.secondary" component="h2">
                <span>Fuel type:</span> {selectedCar.fuelType}
              </Typography>
              <Typography variant="h6" color="text.secondary" component="h2">
                <span>Gear type:</span> {selectedCar.gearType}
              </Typography>
              <Typography variant="h6" color="text.secondary" component="h2">
                <span>Release year:</span> {selectedCar.year}
              </Typography>
              <Typography variant="h6" color="text.secondary" component="h2">
              <span>Description:</span> {selectedCar.desc}
              </Typography>
              <Typography variant="h4" component="h2" color="#1976d2">
              <span>Price:</span> {selectedCar.price}
              </Typography>
            </Box>
            <Box className="modalCarImage">
              <img src={selectedCar.imgURL} alt="selected car"/>
            </Box>
          </Box>
        </Box>
      </Modal>
    </Container>
  )
}