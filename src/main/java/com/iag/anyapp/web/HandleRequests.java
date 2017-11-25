package com.iag.anyapp.web;

import java.io.ByteArrayOutputStream;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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

		try {
			FileInputStream fis = new FileInputStream("/data/test.txt");
			byte buf[] = new byte[fis.available()];
			
			fis.read(buf);
			
			fis.close();
			
			resp.getWriter().println(new String(buf));
			
		} catch (Exception e) {
			e.printStackTrace(resp.getWriter());
		}
	} 
	
	
}
