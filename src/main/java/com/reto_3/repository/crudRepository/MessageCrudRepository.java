package com.reto_3.repository.crudRepository;

import com.reto_3.entity.Message;
import org.springframework.data.repository.CrudRepository;

public interface MessageCrudRepository extends CrudRepository<Message, Integer> {
}
