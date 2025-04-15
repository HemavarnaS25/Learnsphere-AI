const express = require("express");
const cors = require("cors");
const app = express();
const port = 5000;

app.use(cors());

const courses = {
  "AI": {
    title: "Complete AI Mastery",
    description: "Learn AI from basic concepts to real-world applications.",
    modules: [
      { title: "Introduction to AI", content: "What is AI? Applications and history." },
      { title: "AI Basics", content: "Supervised, Unsupervised, Reinforcement Learning." },
      { title: "Advanced AI", content: "Neural Networks, Deep Learning, NLP." },
      { title: "AI Projects", content: "Create AI Chatbots, Image Classifiers, etc." }
    ]
  },
  "Cybersecurity": {
    title: "Complete Cybersecurity Mastery",
    description: "Secure your digital world from threats with in-depth Cybersecurity knowledge.",
    modules: [
      { title: "Introduction to Cybersecurity", content: "What is cybersecurity and why it matters." },
      { title: "Cybersecurity Basics", content: "Encryption, Firewalls, Antivirus." },
      { title: "Advanced Cybersecurity", content: "Penetration Testing, Network Security." },
      { title: "Cybersecurity Projects", content: "Simulate attacks, build firewalls." }
    ]
  },
  "Machine Learning": {
    title: "Machine Learning Masterclass",
    description: "Master ML algorithms and models.",
    modules: [
      { title: "Intro to ML", content: "What is ML? Why learn it?" },
      { title: "ML Basics", content: "Regression, Classification, Clustering." },
      { title: "Advanced ML", content: "Scikit-learn, Model Optimization." },
      { title: "ML Projects", content: "Predictive models, AutoML." }
    ]
  },
  "Cloud Security": {
    title: "Cloud Security Professional",
    description: "Master cloud platforms with security practices.",
    modules: [
      { title: "Intro to Cloud Security", content: "Why is security important in cloud?" },
      { title: "Basics", content: "IAM, Policies, Firewalls." },
      { title: "Advanced Topics", content: "Zero Trust, Compliance, Audits." },
      { title: "Projects", content: "Secure a Cloud App on AWS." }
    ]
  }
};

app.get("/api/generate-course", (req, res) => {
  const keyword = req.query.keyword;
  const course = courses[keyword];

  if (!keyword) {
    return res.status(400).json({ message: "Keyword is required" });
  }

  if (!course) {
    return res.status(404).json({ message: "Course not found" });
  }

  return res.json(course);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
