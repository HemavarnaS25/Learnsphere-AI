router.post("/enroll", async (req, res) => {
    const { email, courseId } = req.body;
    const course = await Course.findById(courseId);
    const student = await Student.findOne({ email });
  
    if (!student.enrolledCourses.includes(courseId)) {
      student.enrolledCourses.push(courseId);
      course.studentsEnrolled.push(student._id);
  
      await student.save();
      await course.save();
  
      res.json({ success: true });
    } else {
      res.status(400).json({ error: "Already enrolled." });
    }
  });
  