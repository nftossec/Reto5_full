package com.reto_3.repository;

import com.reto_3.entity.Client;
import com.reto_3.entity.Reservation;
import com.reto_3.entity.bike.CountClient;
import com.reto_3.repository.crudRepository.ReservationCrudRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Repository
public class ReservationRepository {
    @Autowired
    private ReservationCrudRepository reservationCrudRepository;

    public List<Reservation> getAll(){
        return (List<Reservation>) reservationCrudRepository.findAll();
    }

    public Reservation save(Reservation reservation){
        return reservationCrudRepository.save(reservation);
    }

    public Optional<Reservation> getReservation(Integer idReservation){
        return reservationCrudRepository.findById(idReservation);
    }

    public void deleteReservation(Integer id){
        reservationCrudRepository.deleteById(id);
    }
    public List<CountClient> getTopClients(){
        List<CountClient> respuesta = new ArrayList<>();
        List<Object[]> reporte = reservationCrudRepository.countTotalReservationsByClients();

        for (int i=0; i< reporte.size(); i++){
            respuesta.add(new CountClient((long) reporte.get(i)[1], (Client) reporte.get(i)[0]  ));
        }
        return respuesta;
    }

    public List<Reservation> getReservationPeriod(Date a, Date b){
        return reservationCrudRepository.findAllByStartDateAfterAndDevolutionDateBefore(a,b);
    }

    public List<Reservation> getReservationsByStatus(String status){
        return reservationCrudRepository.findAllByStatus(status);
    }


}
