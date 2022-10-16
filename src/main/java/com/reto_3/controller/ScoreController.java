package com.reto_3.controller;

import com.reto_3.entity.Score;
import com.reto_3.service.ScoreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/Score")
@CrossOrigin(origins = "*",methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
public class ScoreController {
    @Autowired
    private ScoreService scoreService;

    @GetMapping("/all")
    @ResponseStatus(HttpStatus.CREATED)
    public List<Score> getScores(){
        return scoreService.getAll();
    }

    @PostMapping("/save")
    @ResponseStatus(HttpStatus.CREATED)
    public Score postScore(@RequestBody Score data){
        return scoreService.save(data);
    }

    @PutMapping("/update")
    @ResponseStatus(HttpStatus.CREATED)
    public Score putScore(@RequestBody Score data){
        return scoreService.update(data);
    }
}