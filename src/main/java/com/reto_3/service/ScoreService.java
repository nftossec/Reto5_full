package com.reto_3.service;

import com.reto_3.entity.Score;
import com.reto_3.repository.ScoreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ScoreService {
    @Autowired
    private ScoreRepository scoreRepository;

    public List<Score> getAll(){
        return (List<Score>) scoreRepository.getAll();
    }

    public Optional<Score> getScore(int idScore){return scoreRepository.getScore(idScore);}

    public Score save(Score score){
        if(score.getScore() >= 0 && score.getScore() <= 5){
            if(score.getId() == null){
                return scoreRepository.save(score);
            } else {
                Optional<Score> e = scoreRepository.getScore(score.getId());

                if(e.isEmpty()){
                    return scoreRepository.save(score);
                }
            }
        }
        return score;
    }

    public Score update(Score score){
        if(score.getId() != null){
            Optional<Score> s = scoreRepository.getScore(score.getId());
            if(s.isPresent()){
                if(score.getScore() != null) s.get().setScore(score.getScore());
                if(score.getMessage() != null) s.get().setMessage(score.getMessage());
                scoreRepository.save(s.get());
                return s.get();
            }
        }
        return score;
    }
}
