package com.reto_3.repository;


import com.reto_3.entity.Message;
import com.reto_3.repository.crudRepository.MessageCrudRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class MessageRepository {
    @Autowired
    private MessageCrudRepository messageCrudRepository;

    public List<Message> getAll(){
        return (List<Message>) messageCrudRepository.findAll();
    }

    public Message save(Message message){
        return messageCrudRepository.save(message);
    }

    public Optional<Message> getMessage(Integer idMessage){
        return messageCrudRepository.findById(idMessage);
    }

    public void deleteMessage(Integer id){
        messageCrudRepository.deleteById(id);
    }
}
