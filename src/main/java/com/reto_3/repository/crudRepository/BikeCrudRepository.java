package com.reto_3.repository.crudRepository;

import com.reto_3.entity.Bike;
import org.springframework.data.repository.CrudRepository;

public interface BikeCrudRepository extends CrudRepository<Bike, Integer> {}
