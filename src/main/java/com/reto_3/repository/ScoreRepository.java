package com.reto_3.repository;

import com.reto_3.entity.Score;
import com.reto_3.repository.crudRepository.ScoreCrudRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class ScoreRepository {
    @Autowired
    private ScoreCrudRepository scoreCrudRepository;

    public List<Score> getAll(){
        return (List<Score>) scoreCrudRepository.findAll();
    }

    public Optional<Score> getScore(Integer data){
        return scoreCrudRepository.findById(data);
    }

    public Score save(Score data){
        return scoreCrudRepository.save(data);
    }


}
