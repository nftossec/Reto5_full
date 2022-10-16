package com.reto_3.repository;

import com.reto_3.entity.Bike;
import com.reto_3.repository.crudRepository.BikeCrudRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class BikeRepository {
    @Autowired
    private BikeCrudRepository bikeCrudRepository;

    public List<Bike> getAll(){
        return (List<Bike>) bikeCrudRepository.findAll();
    }

    public Bike save(Bike bike){
        return bikeCrudRepository.save(bike);
    }

    public Optional<Bike> getBike(Integer id){
        return bikeCrudRepository.findById(id);
    }

    public void deleteBike(Integer id){
        bikeCrudRepository.deleteById(id);
    }

}
