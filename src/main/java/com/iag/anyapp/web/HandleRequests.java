package com.iag.anyapp.web;

import java.io.ByteArrayOutputStream;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.io.Writer;
import java.sql.Connection;
import java.sql.DriverManager;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Properties;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class RootServlet
 */
@WebServlet("/ui/*")
public class HandleRequests extends HttpServlet {
	private static final long serialVersionUID = 1L;

	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		
		doGet(request, response);
		
	}

	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		PrintWriter w = resp.getWriter();

		try {
			String reqhost = req.getParameter("host");
			Properties prop = System.getProperties();
			String hostname = System.getProperty("OPENSHIFT_POSTGRESQL_DB_HOST");
			w.println("hostval " + hostname);
			w.println("Properties " + prop);
			if (reqhost == null && hostname != null) {
				reqhost = hostname;
			}
			String url = "jdbc:postgresql://" + reqhost + ":5432/crods";//"jdbc:postgresql://localhost:5432/crods";
			String username = "james";
			String password = "password";
			/* 
			String url = "jdbc:postgresql://localhost:5432/crods";
			String username = "postgres";
			String password = "admin";
			*/
			Class.forName("org.postgresql.Driver");
			Connection conn = DriverManager.getConnection(url, username, password);

			w.print(conn);
			
			conn.close();
		} catch (Exception e) {
			e.printStackTrace(w);
		} finally {
			w.close();
			
		}
	} 
	
	
}
