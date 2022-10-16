package com.reto_3.service;

import com.reto_3.entity.Bike;
import com.reto_3.repository.BikeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.lang.reflect.Field;
import java.util.List;
import java.util.Optional;

@Service
public class BikeService {
    @Autowired
    private BikeRepository bikeRepository;

    public List<Bike> getAll() {
        return bikeRepository.getAll();
    }

    public Optional<Bike> getBike(int id) {
        return bikeRepository.getBike(id);
    }

    public Bike save(Bike bike) {
        if (bike.getId() == null) {
            return bikeRepository.save(bike);
        } else {
            Optional<Bike> e = bikeRepository.getBike(bike.getId());
            if (e.isEmpty()) {
                return bikeRepository.save(bike);
            } else {
                return bike;
            }
        }
    }

    public Bike update(Bike bike) {
        if (bike.getId() != null) {
            Optional<Bike> q = bikeRepository.getBike(bike.getId());
            if (q.isPresent()) {
                if (bike.getBrand() != null) {
                    q.get().setBrand(bike.getBrand());
                }
                if (bike.getYear() != null) {
                    q.get().setYear(bike.getYear());
                }
                if (bike.getCategory() != null) {
                    q.get().setCategory(bike.getCategory());
                }
                if (bike.getName() != null) {
                    q.get().setName(bike.getName());
                }
                if (bike.getDescription() != null) {
                    q.get().setDescription(bike.getDescription());
                }
                bikeRepository.save(q.get());
                return q.get();

            } else {
                return bike;
            }

        } else {
            return bike;
        }
    }


    public boolean delete(int id) {
        Boolean flag = false;
        Optional<Bike> bike = bikeRepository.getBike(id);
        if (bike.isPresent()) {
            bikeRepository.deleteBike(bike.get().getId());
            flag = true;
        }
        return flag;
    }

}
