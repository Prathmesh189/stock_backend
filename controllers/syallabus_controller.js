const { syallabus, moduleNames } = require('../models');
const path = require('path');
const fs = require('fs');



const getAllModuleNames = async (req, res) => {
  try {
    const modules = await moduleNames.findAll();

    const formattedModules = await Promise.all(modules.map(async (module) => {
      const syllabusData = await syallabus.findAll({
        where: {
          course_id: module.course_id,
          module_id: module.module_id
        }
      });



      return {
        moduleName: module.moduleNames,
        syllabusCount: syllabusData.length,
        syllabus: syllabusData
      };
    }));

    res.status(200).json({
      status: 1,
      data: formattedModules
    });
  } catch (error) {
    console.error('Error fetching module names:', error);
    res.status(500).json({
      status: 0,
      message:"Something went Wrongs",
      error: 'Internal Server Error'
    });
  }
};


const createSyllabus = async (req, res) => {
  try {
    const { course_id, chapter_id, module_id, chapter_name } = req.body;

    const audioFile = req.files?.audio?.[0];
    const documentFile = req.files?.document?.[0];

    if (!audioFile || !documentFile) {
      return res.status(400).json({ message: 'Audio file and PDF document are required' });
    }

    const newSyllabus = await syallabus.create({
      course_id,
      chapter_id,
      module_id,
      chapter_name,
      audiopath: audioFile.path,
      pdfpath: documentFile.path,
    });

    res.status(201).json({
      message: 'Syllabus created successfully',
      data: newSyllabus,
    });
  } catch (error) {
    console.error('Error creating syllabus:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


const createSyllabusbyLinks = async (req, res) => {
  try {
    const { course_id, chapter_id, module_id, chapter_name, audiopath, pdfpath } = req.body;

    if (!course_id || !chapter_id || !module_id || !chapter_name || !pdfpath) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newSyllabus = await syallabus.create({
      course_id,
      chapter_id,
      module_id,
      chapter_name,
      audiopath,
      pdfpath
    });

    res.status(201).json({
      message: 'Syllabus created successfully',
      data: newSyllabus,
    });
  } catch (error) {
    console.error('Error creating syllabus:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getAllSyllabi = async (req, res) => {
  try {
    const data = await syallabus.findAll();


    if (!data || data.length === 0) {
      return res.status(404).json({ message: 'No syllabus found' });
    }

    // const baseUrl = `${req.protocol}://${req.get('host')}`;
    // const responseData = data.map(item => ({
    //   ...item.toJSON(),
    //   audioUrl: item.audiopath ? `${baseUrl}/${item.audiopath.replace(/\\/g, '/')}` : null,
    //   documentUrl: item.pdfpath ? `${baseUrl}/${item.pdfpath.replace(/\\/g, '/')}` : null
    // }));

    res.status(200).json({
      message: 'Syllabi fetched successfully',
      data: data,
    });
  } catch (error) {
    console.error('Error fetching syllabi:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getByCourse = async (req, res) => {
  try {
    const { module_id } = req.params;

    const data = module_id
      ? await syallabus.findAll({ where: { module_id } })
      : await syallabus.findAll();

    if (!data) {
      return res.status(404).json({ message: 'Syllabus not found' });
    }


    const count = data.length;



    res.status(200).json({
      message: 'Syllabus fetched successfully',
      count,
      data: data
    });
  } catch (error) {
    console.error('Error fetching syllabus:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};



















const getAllbyCourse = async (req, res) => {
  try {
    const { course_id, module_id } = req.query;

    const queryCondition = {};
    if (course_id) {
      queryCondition.course_id = course_id;
    }
    if (module_id) {
      queryCondition.module_id = module_id;
    }

    // Fetch data based on the condition
    const data = await syallabus.findAll({
      where: queryCondition
    });

    if (!data || data.length === 0) {
      return res.status(404).json({ message: 'No syllabus found' });
    }

    // Uncomment and customize the baseUrl if you need to construct URLs for audio and document paths
    // const baseUrl = `${req.protocol}://${req.get('host')}`;
    // const responseData = data.map(item => ({
    //   ...item.toJSON(),
    //   audioUrl: item.audiopath ? `${baseUrl}/${item.audiopath.replace(/\\/g, '/')}` : null,
    //   documentUrl: item.pdfpath ? `${baseUrl}/${item.pdfpath.replace(/\\/g, '/')}` : null
    // }));

    res.status(200).json({
      message: 'Syllabi fetched successfully',
      data: data,
      // data: responseData, // Use this if using audioUrl and documentUrl
    });
  } catch (error) {
    console.error('Error fetching syllabi:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};




module.exports = {
  createSyllabus,
  getAllSyllabi,
  getByCourse,
  createSyllabusbyLinks,
  getAllbyCourse,
  getAllModuleNames

};
