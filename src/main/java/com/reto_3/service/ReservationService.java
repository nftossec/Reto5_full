package com.reto_3.service;


import com.reto_3.entity.Reservation;
import com.reto_3.entity.bike.CountClient;
import com.reto_3.entity.bike.CountStatus;
import com.reto_3.repository.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class ReservationService {
    @Autowired
    private ReservationRepository reservationRepository;

    public List<Reservation> getAll(){
        return reservationRepository.getAll();
    }

    public Optional<Reservation> getReservation(int idReservation){
        return reservationRepository.getReservation(idReservation);
    }

    public Reservation save(Reservation reservation){
        if(reservation.getIdReservation()==null){
            return reservationRepository.save(reservation);
        } else {
            Optional<Reservation> e=reservationRepository.getReservation(reservation.getIdReservation());
            if(e.isEmpty()){
                return reservationRepository.save(reservation);
            }else{
                return reservation;
            }
        }
    }

    public Reservation  update(Reservation  reservation){
        if(reservation.getIdReservation()!=null){
            Optional<Reservation > q = reservationRepository.getReservation(reservation.getIdReservation());
            if(q.isPresent()){
                if(reservation.getStartDate()!=null){
                    q.get().setStartDate(reservation.getStartDate());
                }

                if(reservation.getDevolutionDate()!=null){
                    q.get().setDevolutionDate(reservation.getDevolutionDate());
                }

                reservationRepository.save(q.get());
                return q.get();

            }else {
                return reservation;
            }

        }else {
            return reservation;
        }
    }

    public boolean delete(int idReservation){
         Boolean flag=false;
        Optional<Reservation > reservation= reservationRepository.getReservation(idReservation);
        if(reservation.isPresent()){
            reservationRepository.deleteReservation(reservation.get().getIdReservation());
            flag=true;
        }

        return flag;
    }

    public List<CountClient> getTopClients(){
        return reservationRepository.getTopClients();
    }

    public List<Reservation>getReservationPeriod(String dateA, String dateB){
        SimpleDateFormat parser = new SimpleDateFormat("yyyy-MM-dd");
        Date a = new Date();
        Date b = new Date();

        try {
            a=parser.parse(dateA);
            b=parser.parse(dateB);
        }catch (ParseException exception){
            exception.printStackTrace();
        }
        if(a.before(b)){
            return reservationRepository.getReservationPeriod(a,b);
        }else {
            return new ArrayList<>();
        }

    }

    public CountStatus getReservationsStatus(){
        List<Reservation> completed = reservationRepository.getReservationsByStatus(("completed"));

        List<Reservation> cancelled = reservationRepository.getReservationsByStatus("cancelled");

        return new CountStatus((long) completed.size(), (long) cancelled.size());
    }


}
