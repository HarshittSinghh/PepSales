function generateEmailHTML({ name, tweet, img }) {
  return `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f4; padding: 30px;">
      <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 12px; box-shadow: 0 0 10px rgba(0,0,0,0.1); padding: 30px;">
        
        <h1 style="color: #1DA1F2;">📢 New Tweet Alert</h1>

        <p style="font-size: 18px; margin-top: 20px;">Hello <strong style="color: #1DA1F2;">${name}</strong> 👋,</p>
        <p style="font-size: 16px; color: #333;">Someone just tweeted something new on <strong>X-Clone</strong>! Check it out below:</p>

        <div style="margin: 30px 0; padding: 20px; background-color: #f0f8ff; border-left: 4px solid #1DA1F2; border-radius: 8px;">
          <div style="display: flex; align-items: center; margin-bottom: 10px;">
            <img src="${img}" alt="Profile Picture" width="50" height="50" style="border-radius: 50%; margin-right: 15px;" />
            <span style="font-weight: bold; font-size: 16px;">${name}</span>
          </div>
          <p style="font-style: italic; font-size: 15px; margin-top: 10px; color: #555;">"${tweet}"</p>
        </div>

        <a href="https://clone-x-com.netlify.app/" style="display: inline-block; padding: 10px 20px; background-color: #1DA1F2; color: #fff; text-decoration: none; border-radius: 5px; font-weight: bold;">View Tweet</a>

        <hr style="margin-top: 40px;" />

        <p style="font-size: 12px; color: #999;">You’re receiving this email because you're registered on X-Clone.</p>
        <p style="font-size: 12px; color: #999;">© ${new Date().getFullYear()} X-Clone. All rights reserved.</p>
      </div>
    </div>
  `;
}

module.exports = generateEmailHTML;
