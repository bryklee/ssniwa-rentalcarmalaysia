package my.com.rentalcarmalaysia.servlet;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.tanesha.recaptcha.ReCaptchaImpl;
import net.tanesha.recaptcha.ReCaptchaResponse;

import org.json.simple.JSONObject;

@SuppressWarnings("serial")
public class ContactUsServlet extends HttpServlet {

    public static final String RESP_FIELD_CODE = "code";
    public static final String RESP_RESULT_SUCCESS = "1";
    public static final String RESP_RESULT_ERR_UNKNOWN = "-1";
    public static final String RESP_RESULT_ERR_VERIFY_CAPTCHA = "-2";
    
    private String recaptcha_privatekey;
    
    @Override
    public void init() throws ServletException {
        super.init();
        recaptcha_privatekey = System.getenv("RECAPTCHA_PRI");
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        JSONObject jsonobj = new JSONObject();
        if( recaptcha_privatekey == null || recaptcha_privatekey.trim().equals("") ) {
            putJsonobj(jsonobj, RESP_FIELD_CODE, RESP_RESULT_ERR_UNKNOWN);
            commitJSONResp(resp, jsonobj);
            return;
        }
        
        String remoteAddr = req.getRemoteAddr();
        String challenge = req.getParameter("captchaChall");
        String uresponse = req.getParameter("captchaResp");
        
        if( remoteAddr == null || remoteAddr.trim().equals("")
                || challenge == null || challenge.trim().equals("")) {
            putJsonobj(jsonobj, RESP_FIELD_CODE, RESP_RESULT_ERR_UNKNOWN);
            commitJSONResp(resp, jsonobj);
            return;
        }
        
        ReCaptchaImpl reCaptcha = new ReCaptchaImpl();
        reCaptcha.setPrivateKey(recaptcha_privatekey);
        
        ReCaptchaResponse reCaptchaResponse = reCaptcha.checkAnswer(remoteAddr, challenge, uresponse);
        if( !reCaptchaResponse.isValid() ) {
            putJsonobj(jsonobj, RESP_FIELD_CODE, RESP_RESULT_ERR_VERIFY_CAPTCHA);
            commitJSONResp(resp, jsonobj);
            return;
        }
        
        //TODO: Send email
        
        putJsonobj(jsonobj, RESP_FIELD_CODE, RESP_RESULT_SUCCESS);
        commitJSONResp(resp, jsonobj);
    }
    
    private void commitJSONResp(HttpServletResponse resp, JSONObject jsonobj) throws IOException {
        String json = jsonobj.toString();
        resp.setStatus(HttpServletResponse.SC_OK);
        resp.setContentType("application/json");
        resp.getOutputStream().write(json.getBytes(), 0, json.getBytes().length);
        resp.getOutputStream().flush();
        resp.getOutputStream().close();
    }

    @SuppressWarnings("unchecked")
    private Object putJsonobj(JSONObject jsonobj, String key, String value) {
        return jsonobj.put(key, value);
    }
    
}
