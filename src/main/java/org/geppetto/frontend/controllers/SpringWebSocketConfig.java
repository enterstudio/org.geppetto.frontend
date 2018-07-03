package org.geppetto.frontend.controllers;

import org.geppetto.core.manager.IGeppettoManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;
import org.springframework.web.socket.server.support.HttpSessionHandshakeInterceptor;

@Configuration
@EnableWebSocket
@EnableWebSocketMessageBroker
public class SpringWebSocketConfig implements WebSocketConfigurer {

	@Autowired
	private IGeppettoManager geppettoManager;
	 
	@Override
	public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
		registry.addHandler(echoService(), "/myHandler").setAllowedOrigins("*").
		addInterceptors(new HttpSessionHandshakeInterceptor());
	}
	
	@Bean
	public WebsocketConnection echoService() {
		return new WebsocketConnection(geppettoManager);
	}

}