package com.reto_3.controller;


import com.reto_3.entity.Bike;
import com.reto_3.service.BikeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/Bike")
@CrossOrigin(origins = "*",methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
public class BikeController {
    @Autowired
    private BikeService bikeService;

    @GetMapping("/all")
    public List<Bike> getBikes(){
        return bikeService.getAll();
    }

   /* @PostMapping("/all")
    @ResponseStatus(HttpStatus.CREATED)
    public Bike postBike(@RequestBody Bike bike){
        return bikeService.save(bike);
    }*/
    @PostMapping("/save")
    @ResponseStatus(HttpStatus.CREATED)
    public Bike postBike1(@RequestBody Bike bike){
        return bikeService.save(bike);
    }
    @PutMapping("/update")
    @ResponseStatus(HttpStatus.CREATED)
    public Bike putBike(@RequestBody Bike bike){
        return bikeService.update(bike);
    }
    /*
    @PutMapping("/all")
    @ResponseStatus(HttpStatus.CREATED)
    public Bike putBike1(@RequestBody Bike bike){
        return bikeService.update(bike);
    }*/

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteBike(@PathVariable("id")int id){
        bikeService.delete(id);
    }

}
