package com.finpulse.api.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class AngularForwardingController {

    // Forwards all unmatched requests (that don't have an extension like .js or .css) to the Angular index.html.
    // This allows Angular to handle the UI routing instead of Spring Boot throwing a 404 error.
    @RequestMapping(value = "/{path:[^\\.]*}")
    public String forward() {
        return "forward:/";
    }
}
