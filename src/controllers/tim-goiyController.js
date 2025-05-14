const course = require("../models/courseModel.js")

//lay data truyen vao trang home 
module.exports.index = async (req, res) => {
    try {
        const courseL = await course.find();
        res.render("file giao diện trang home"
            , {
                title: "trang home - tim kiem ",
                courseL: courseL
            })
    } catch (error) {
        console.log("loi")
    }

}

//tim kiem khoa hoc
module.exports.timKiem_goiy = async (req, res) => {
    let keyname = ""
    try {
        //tim kiem khoa hoc
        if (req.query.keyname) {
            keyname = req.query.q;
            const regex = new RegExp(keyname, 'i');
            const courseL = await Course.find({ title: regex });

        }
        //goi y khoa hoc 
        if (req.params.id) {
            const courseId = req.params.id;
            const course = await Course.findById(courseId);
            if (!course) {
                return res.status(404).send('khong co');
            }

            const goiy = await Course.find({
                _id: { $ne: courseId },
                $or: [
                    { chude: course.chude }
                ]
            }).limit(5);
        }
        res.render('courses'//file giao dien 
            , { courseL, keyname, goiy });
    } catch (err) {
        res.status(500).send('loi');
    }
};
