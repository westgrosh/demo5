package com.example.demo.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class IndexController {

    @GetMapping
    public String goToIndex(Model model){

        model.addAttribute("message", "Hello from SpringBoot");

        return "index";
    }

}
