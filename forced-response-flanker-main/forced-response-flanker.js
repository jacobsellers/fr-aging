/******************************** 
 * Forced-Response-Flanker *
 ********************************/

import { core, data, sound, util, visual, hardware } from './lib/psychojs-2024.1.5.js';
const { PsychoJS } = core;
const { TrialHandler, MultiStairHandler } = data;
const { Scheduler } = util;
//some handy aliases as in the psychopy scripts;
const { abs, sin, cos, PI: pi, sqrt } = Math;
const { round } = util;


// store info about the experiment session:
let expName = 'forced-response-flanker';  // from the Builder filename that created this script
let expInfo = {
    'PROLIFIC_PID': '',
    'AGE_GROUP': '',
};

// Start code blocks for 'Before Experiment'
// init psychoJS:
const psychoJS = new PsychoJS({
  debug: true
});

// open window:
psychoJS.openWindow({
  fullscr: true,
  color: new util.Color('black'),
  units: 'height',
  waitBlanking: true,
  backgroundImage: '',
  backgroundFit: 'none',
});
// schedule the experiment:
psychoJS.schedule(psychoJS.gui.DlgFromDict({
  dictionary: expInfo,
  title: expName
}));

const flowScheduler = new Scheduler(psychoJS);
const dialogCancelScheduler = new Scheduler(psychoJS);
psychoJS.scheduleCondition(function() { return (psychoJS.gui.dialogComponent.button === 'OK'); }, flowScheduler, dialogCancelScheduler);

// flowScheduler gets run if the participants presses OK
flowScheduler.add(updateInfo); // add timeStamp
flowScheduler.add(experimentInit);
flowScheduler.add(fpsCheckRoutineBegin());
flowScheduler.add(fpsCheckRoutineEachFrame());
flowScheduler.add(fpsCheckRoutineEnd());
flowScheduler.add(exp_setupRoutineBegin());
flowScheduler.add(exp_setupRoutineEachFrame());
flowScheduler.add(exp_setupRoutineEnd());
flowScheduler.add(instructions_flankerRoutineBegin());
flowScheduler.add(instructions_flankerRoutineEachFrame());
flowScheduler.add(instructions_flankerRoutineEnd());
const free_demo_loopLoopScheduler = new Scheduler(psychoJS);
flowScheduler.add(free_demo_loopLoopBegin(free_demo_loopLoopScheduler));
flowScheduler.add(free_demo_loopLoopScheduler);
flowScheduler.add(free_demo_loopLoopEnd);


flowScheduler.add(get_readyRoutineBegin());
flowScheduler.add(get_readyRoutineEachFrame());
flowScheduler.add(get_readyRoutineEnd());
const trial_train_freeLoopScheduler = new Scheduler(psychoJS);
flowScheduler.add(trial_train_freeLoopBegin(trial_train_freeLoopScheduler));
flowScheduler.add(trial_train_freeLoopScheduler);
flowScheduler.add(trial_train_freeLoopEnd);




flowScheduler.add(instructions_timingRoutineBegin());
flowScheduler.add(instructions_timingRoutineEachFrame());
flowScheduler.add(instructions_timingRoutineEnd());
const timing_demo_loopLoopScheduler = new Scheduler(psychoJS);
flowScheduler.add(timing_demo_loopLoopBegin(timing_demo_loopLoopScheduler));
flowScheduler.add(timing_demo_loopLoopScheduler);
flowScheduler.add(timing_demo_loopLoopEnd);


flowScheduler.add(get_readyRoutineBegin());
flowScheduler.add(get_readyRoutineEachFrame());
flowScheduler.add(get_readyRoutineEnd());
const trial_train_timingLoopScheduler = new Scheduler(psychoJS);
flowScheduler.add(trial_train_timingLoopBegin(trial_train_timingLoopScheduler));
flowScheduler.add(trial_train_timingLoopScheduler);
flowScheduler.add(trial_train_timingLoopEnd);




flowScheduler.add(instructionsRoutineBegin());
flowScheduler.add(instructionsRoutineEachFrame());
flowScheduler.add(instructionsRoutineEnd());
const exp_demo_loopLoopScheduler = new Scheduler(psychoJS);
flowScheduler.add(exp_demo_loopLoopBegin(exp_demo_loopLoopScheduler));
flowScheduler.add(exp_demo_loopLoopScheduler);
flowScheduler.add(exp_demo_loopLoopEnd);


const blocksLoopScheduler = new Scheduler(psychoJS);
flowScheduler.add(blocksLoopBegin(blocksLoopScheduler));
flowScheduler.add(blocksLoopScheduler);
flowScheduler.add(blocksLoopEnd);







flowScheduler.add(end_studyRoutineBegin());
flowScheduler.add(end_studyRoutineEachFrame());
flowScheduler.add(end_studyRoutineEnd());
flowScheduler.add(quitPsychoJS, '', true);

// quit if user presses Cancel in dialog box:
dialogCancelScheduler.add(quitPsychoJS, '', false);

psychoJS.start({
  expName: expName,
  expInfo: expInfo,
  resources: [
    // resources:
    {'name': 'conditions.xlsx', 'path': 'conditions.xlsx'},
    {'name': 'left.png', 'path': 'left.png'},
    {'name': 'right.png', 'path': 'right.png'},
    {'name': 'conditions.xlsx', 'path': 'conditions.xlsx'},
    {'name': 'left.png', 'path': 'left.png'},
    {'name': 'right.png', 'path': 'right.png'},
    {'name': 'instructions/free_ins.png', 'path': 'instructions/free_ins.png'},
    {'name': 'instructions/free_demo.mp4', 'path': 'instructions/free_demo.mp4'},
    {'name': 'default.png', 'path': 'https://pavlovia.org/assets/default/default.png'},
    {'name': 'instructions/timing_ins.png', 'path': 'instructions/timing_ins.png'},
    {'name': 'instructions/timing_demo.mp4', 'path': 'instructions/timing_demo.mp4'},
    {'name': 'instructions/exp_ins.png', 'path': 'instructions/exp_ins.png'},
    {'name': 'instructions/exp_demo.mp4', 'path': 'instructions/exp_demo.mp4'},
  ]
});

psychoJS.experimentLogger.setLevel(core.Logger.ServerLevel.EXP);


var currentLoop;
var frameDur;
async function updateInfo() {
  currentLoop = psychoJS.experiment;  // right now there are no loops
  expInfo['date'] = util.MonotonicClock.getDateStr();  // add a simple timestamp
  expInfo['expName'] = expName;
  expInfo['psychopyVersion'] = '2024.1.5';
  expInfo['OS'] = window.navigator.platform;


  // store frame rate of monitor if we can measure it successfully
  expInfo['frameRate'] = psychoJS.window.getActualFrameRate();
  if (typeof expInfo['frameRate'] !== 'undefined')
    frameDur = 1.0 / Math.round(expInfo['frameRate']);
  else
    frameDur = 1.0 / 60.0; // couldn't get a reliable measure so guess

  // add info from the URL:
  util.addInfoFromUrl(expInfo);
  psychoJS.setRedirectUrls(((((('https://umich.qualtrics.com/jfe/form/SV_0q5qeF556IwNuZM?PROLIFIC_PID=' + expInfo['PROLIFIC_PID']) + '&expName=') + expName) + '&AGE_GROUP=') + expInfo['AGE_GROUP']), '');


  
  psychoJS.experiment.dataFileName = (("." + "/") + `data/${expInfo["AGE_GROUP"]}_${expInfo["PROLIFIC_PID"]}_${expName}`);
  psychoJS.experiment.field_separator = '\t';


  return Scheduler.Event.NEXT;
}


var fpsCheckClock;
var text_4;
var exp_setupClock;
var thisExp;
var win;
var randint;
var getBrowserId;
var nReps_freeRT;
var nReps_timing;
var nReps_forcedRT;
var nBlocks;
var size_fl;
var min_pt;
var max_pt;
var step;
var timing_goal;
var possible_target_onset_timings;
var instructions_flankerClock;
var free_ins_image;
var instruct_resp_fl;
var free_demoClock;
var free_demo_movieClock;
var free_demo_movie;
var free_demo_key;
var get_readyClock;
var ready_text;
var freeClock;
var acc_free;
var acc_free_last20;
var fixation_fl;
var fixation_fl_2;
var w_prompt;
var p_prompt;
var target_fl;
var left1_fl;
var left2_fl;
var right1_fl;
var right2_fl;
var trial_resp_fl;
var feedbackClock;
var feedback_text;
var fail_taskClock;
var terminate_task;
var text_5;
var instructions_timingClock;
var instruct_timing_image;
var instruct_resp_timing;
var timing_demoClock;
var timing_demo_movieClock;
var timing_demo_movie;
var timing_demo_key;
var timingClock;
var acc_timing;
var acc_timing_last20;
var trial_resp_timing;
var fixation_timing;
var dot1_timing;
var dot2_timing;
var dot3_timing;
var dot4_timing;
var fixation_timing_2;
var dot1_timing_2;
var dot2_timing_2;
var dot3_timing_2;
var dot4_timing_2;
var feedback_timingClock;
var feedback_text_timing;
var instructionsClock;
var instruct_image;
var instruct_resp;
var exp_demoClock;
var exp_demo_movieClock;
var exp_demo_movie;
var exp_demo_key;
var trialClock;
var forcedRT_resp;
var fixation;
var dot1;
var dot2;
var dot3;
var dot4;
var fixation_2;
var dot1_2;
var dot2_2;
var dot3_2;
var dot4_2;
var target;
var left1;
var left2;
var right1;
var right2;
var feedback_testClock;
var feedback_test_text;
var wait_text;
var end_blockClock;
var block_id;
var block_text;
var rest_text;
var rest_key;
var end_studyClock;
var study_over;
var exit_resp;
var globalClock;
var routineTimer;
async function experimentInit() {
  // Initialize components for Routine "fpsCheck"
  fpsCheckClock = new util.Clock();
  text_4 = new visual.TextStim({
    win: psychoJS.window,
    name: 'text_4',
    text: "Sorry, but your browser's refresh rate is too low to display the task. \n\nPlease press ESCAPE and return your submission.\n\nWe apologize for any inconvenience. ",
    font: 'Arial',
    units: undefined, 
    pos: [0, 0], height: 0.05,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: undefined,
    depth: -1.0 
  });
  
  // Initialize components for Routine "exp_setup"
  exp_setupClock = new util.Clock();
  thisExp=psychoJS.experiment;
  win=psychoJS.window;
  
  // some useful functions
  //let asarray=function(something) {
  //  return something;
  //}
  
  //shuffle = util.shuffle;
  
  randint = function(min, maxplusone) {
    return Math.floor(Math.random() * (maxplusone - min) ) + min;
  }
  
  // save IP address
  $.getJSON('https://api.ipify.org?format=json', function(data){
      console.log(data.ip);
      localStorage.setItem('ip',data.ip);
      thisExp.addData('IP_Addresss', data.ip)
      });
  
  // detect browser
  var sUsrAg;
  var nIdx;
  getBrowserId = function() {
      var browsers = ["MSIE", "Firefox", "Safari", "Chrome", "Opera"];
      sUsrAg = window.navigator.userAgent,
      nIdx = browsers.length - 1;
      for (nIdx; nIdx > -1 && sUsrAg.indexOf(browsers [nIdx]) === -1; nIdx--);
  
    return browsers[nIdx];
  }
  
  // record browser
  thisExp.addData('Browser', getBrowserId());
  
  // hide cursor
  document.body.style.cursor='none';
  
  // Run 'Begin Experiment' code from exp_params
  nReps_freeRT = 999;
  nReps_timing = 999;
  nReps_forcedRT = 13;
  nBlocks = 10;
  size_fl = [0.06, 0.06];
  min_pt = 0;
  max_pt = 1200;
  step = 20;
  timing_goal = 2000;
  possible_target_onset_timings = util.range((timing_goal - max_pt), ((timing_goal - min_pt) + step), step);
  console.log("possible_target_onset_timings", possible_target_onset_timings);
  
  // Initialize components for Routine "instructions_flanker"
  instructions_flankerClock = new util.Clock();
  free_ins_image = new visual.ImageStim({
    win : psychoJS.window,
    name : 'free_ins_image', units : undefined, 
    image : 'instructions/free_ins.png', mask : undefined,
    anchor : 'center',
    ori : 0.0, pos : [0, 0], size : [1.33, 1],
    color : new util.Color([1,1,1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -1.0 
  });
  instruct_resp_fl = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
  
  // Initialize components for Routine "free_demo"
  free_demoClock = new util.Clock();
  free_demo_movieClock = new util.Clock();
  free_demo_movie = new visual.MovieStim({
    win: psychoJS.window,
    name: 'free_demo_movie',
    units: psychoJS.window.units,
    movie: 'instructions/free_demo.mp4',
    pos: [0, 0],
    anchor: 'center',
    size: [1.33, 1],
    ori: 0.0,
    opacity: undefined,
    loop: false,
    noAudio: false,
    depth: 0
    });
  free_demo_key = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
  
  // Initialize components for Routine "get_ready"
  get_readyClock = new util.Clock();
  ready_text = new visual.TextStim({
    win: psychoJS.window,
    name: 'ready_text',
    text: 'Get Ready',
    font: 'Open Sans',
    units: undefined, 
    pos: [0, 0], height: 0.025,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: undefined,
    depth: 0.0 
  });
  
  // Initialize components for Routine "free"
  freeClock = new util.Clock();
  // Run 'Begin Experiment' code from trial_code_fl
  acc_free = [];
  acc_free_last20 = null;
  
  fixation_fl = new visual.Rect ({
    win: psychoJS.window, name: 'fixation_fl', 
    width: [0.35, 0.03][0], height: [0.35, 0.03][1],
    ori: 0, pos: [0, 0.07],
    anchor: 'center',
    lineWidth: 3, 
    colorSpace: 'rgb',
    lineColor: new util.Color('lightgray'),
    fillColor: undefined,
    fillColor: undefined,
    opacity: 1, depth: -2, interpolate: true,
  });
  
  fixation_fl_2 = new visual.Rect ({
    win: psychoJS.window, name: 'fixation_fl_2', 
    width: [0.35, 0.03][0], height: [0.35, 0.03][1],
    ori: 0, pos: [0, (- 0.07)],
    anchor: 'center',
    lineWidth: 3, 
    colorSpace: 'rgb',
    lineColor: new util.Color('lightgray'),
    fillColor: undefined,
    fillColor: undefined,
    opacity: 1, depth: -3, interpolate: true,
  });
  
  w_prompt = new visual.TextStim({
    win: psychoJS.window,
    name: 'w_prompt',
    text: 'W - Left',
    font: 'Open Sans',
    units: undefined, 
    pos: [(- 0.4), (- 0.3)], height: 0.04,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('lightgray'),  opacity: undefined,
    depth: -4.0 
  });
  
  p_prompt = new visual.TextStim({
    win: psychoJS.window,
    name: 'p_prompt',
    text: 'P - Right',
    font: 'Open Sans',
    units: undefined, 
    pos: [0.4, (- 0.3)], height: 0.04,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('lightgray'),  opacity: undefined,
    depth: -5.0 
  });
  
  target_fl = new visual.ImageStim({
    win : psychoJS.window,
    name : 'target_fl', units : undefined, 
    image : 'default.png', mask : undefined,
    anchor : 'center',
    ori : 0.0, pos : [0, 0], size : size_fl,
    color : new util.Color([1,1,1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -6.0 
  });
  left1_fl = new visual.ImageStim({
    win : psychoJS.window,
    name : 'left1_fl', units : undefined, 
    image : 'default.png', mask : undefined,
    anchor : 'center',
    ori : 0.0, pos : [(- 0.07), 0], size : size_fl,
    color : new util.Color([1,1,1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -7.0 
  });
  left2_fl = new visual.ImageStim({
    win : psychoJS.window,
    name : 'left2_fl', units : undefined, 
    image : 'default.png', mask : undefined,
    anchor : 'center',
    ori : 0.0, pos : [(- 0.14), 0], size : size_fl,
    color : new util.Color([1,1,1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -8.0 
  });
  right1_fl = new visual.ImageStim({
    win : psychoJS.window,
    name : 'right1_fl', units : undefined, 
    image : 'default.png', mask : undefined,
    anchor : 'center',
    ori : 0.0, pos : [0.07, 0], size : size_fl,
    color : new util.Color([1,1,1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -9.0 
  });
  right2_fl = new visual.ImageStim({
    win : psychoJS.window,
    name : 'right2_fl', units : undefined, 
    image : 'default.png', mask : undefined,
    anchor : 'center',
    ori : 0.0, pos : [0.14, 0], size : size_fl,
    color : new util.Color([1,1,1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -10.0 
  });
  trial_resp_fl = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
  
  // Initialize components for Routine "feedback"
  feedbackClock = new util.Clock();
  feedback_text = new visual.TextStim({
    win: psychoJS.window,
    name: 'feedback_text',
    text: '',
    font: 'Arial',
    units: undefined, 
    pos: [0, 0], height: 0.05,  wrapWidth: undefined, ori: 0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: 1,
    depth: 0.0 
  });
  
  // Initialize components for Routine "fail_task"
  fail_taskClock = new util.Clock();
  // Run 'Begin Experiment' code from code_8
  terminate_task = false;
  
  text_5 = new visual.TextStim({
    win: psychoJS.window,
    name: 'text_5',
    text: 'Sorry, but your task accuracy is too low to complete the task. \n\nPlease press ESCAPE and return your submission.\n\nYou may be entitled to receive partial credit. Please contact the experimenter.\n\nWe apologize for any inconvenience. ',
    font: 'Arial',
    units: undefined, 
    pos: [0, 0], height: 0.05,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: undefined,
    depth: -1.0 
  });
  
  // Initialize components for Routine "instructions_timing"
  instructions_timingClock = new util.Clock();
  instruct_timing_image = new visual.ImageStim({
    win : psychoJS.window,
    name : 'instruct_timing_image', units : undefined, 
    image : 'instructions/timing_ins.png', mask : undefined,
    anchor : 'center',
    ori : 0.0, pos : [0, 0], size : [1.33, 1],
    color : new util.Color([1,1,1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : 0.0 
  });
  instruct_resp_timing = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
  
  // Initialize components for Routine "timing_demo"
  timing_demoClock = new util.Clock();
  timing_demo_movieClock = new util.Clock();
  timing_demo_movie = new visual.MovieStim({
    win: psychoJS.window,
    name: 'timing_demo_movie',
    units: psychoJS.window.units,
    movie: 'instructions/timing_demo.mp4',
    pos: [0, 0],
    anchor: 'center',
    size: [1.33, 1],
    ori: 0.0,
    opacity: undefined,
    loop: false,
    noAudio: false,
    depth: 0
    });
  timing_demo_key = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
  
  // Initialize components for Routine "timing"
  timingClock = new util.Clock();
  // Run 'Begin Experiment' code from trial_code_timing
  acc_timing = [];
  acc_timing_last20 = null;
  
  trial_resp_timing = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
  
  fixation_timing = new visual.Rect ({
    win: psychoJS.window, name: 'fixation_timing', units : 'height', 
    width: [0.35, 0.03][0], height: [0.35, 0.03][1],
    ori: 0, pos: [0, 0.07],
    anchor: 'center',
    lineWidth: 3, 
    colorSpace: 'rgb',
    lineColor: new util.Color('lightgray'),
    fillColor: undefined,
    fillColor: undefined,
    opacity: 1, depth: -3, interpolate: true,
  });
  
  dot1_timing = new visual.Rect ({
    win: psychoJS.window, name: 'dot1_timing', units : 'height', 
    width: [0.0875, 0.03][0], height: [0.0875, 0.03][1],
    ori: 0, pos: [0, 0.07],
    anchor: 'center',
    lineWidth: 0, 
    colorSpace: 'rgb',
    lineColor: new util.Color('lightgray'),
    fillColor: new util.Color('lightgray'),
    fillColor: 'lightgray',
    opacity: 1, depth: -4, interpolate: true,
  });
  
  dot2_timing = new visual.Rect ({
    win: psychoJS.window, name: 'dot2_timing', units : 'height', 
    width: [0.175, 0.03][0], height: [0.175, 0.03][1],
    ori: 0, pos: [0, 0.07],
    anchor: 'center',
    lineWidth: 0, 
    colorSpace: 'rgb',
    lineColor: new util.Color('lightgray'),
    fillColor: new util.Color('lightgray'),
    fillColor: 'lightgray',
    opacity: 1, depth: -5, interpolate: true,
  });
  
  dot3_timing = new visual.Rect ({
    win: psychoJS.window, name: 'dot3_timing', units : 'height', 
    width: [0.2625, 0.03][0], height: [0.2625, 0.03][1],
    ori: 0, pos: [0, 0.07],
    anchor: 'center',
    lineWidth: 0, 
    colorSpace: 'rgb',
    lineColor: new util.Color('lightgray'),
    fillColor: new util.Color('lightgray'),
    fillColor: 'lightgray',
    opacity: 1, depth: -6, interpolate: true,
  });
  
  dot4_timing = new visual.Rect ({
    win: psychoJS.window, name: 'dot4_timing', units : 'height', 
    width: [0.35, 0.03][0], height: [0.35, 0.03][1],
    ori: 0, pos: [0, 0.07],
    anchor: 'center',
    lineWidth: 0, 
    colorSpace: 'rgb',
    lineColor: new util.Color('lightgray'),
    fillColor: new util.Color('lightgray'),
    fillColor: 'lightgray',
    opacity: 1, depth: -7, interpolate: true,
  });
  
  fixation_timing_2 = new visual.Rect ({
    win: psychoJS.window, name: 'fixation_timing_2', units : 'height', 
    width: [0.35, 0.03][0], height: [0.35, 0.03][1],
    ori: 0, pos: [0, (- 0.07)],
    anchor: 'center',
    lineWidth: 3, 
    colorSpace: 'rgb',
    lineColor: new util.Color('lightgray'),
    fillColor: undefined,
    fillColor: undefined,
    opacity: 1, depth: -8, interpolate: true,
  });
  
  dot1_timing_2 = new visual.Rect ({
    win: psychoJS.window, name: 'dot1_timing_2', units : 'height', 
    width: [0.0875, 0.03][0], height: [0.0875, 0.03][1],
    ori: 0, pos: [0, (- 0.07)],
    anchor: 'center',
    lineWidth: 0, 
    colorSpace: 'rgb',
    lineColor: new util.Color('lightgray'),
    fillColor: new util.Color('lightgray'),
    fillColor: 'lightgray',
    opacity: 1, depth: -9, interpolate: true,
  });
  
  dot2_timing_2 = new visual.Rect ({
    win: psychoJS.window, name: 'dot2_timing_2', units : 'height', 
    width: [0.175, 0.03][0], height: [0.175, 0.03][1],
    ori: 0, pos: [0, (- 0.07)],
    anchor: 'center',
    lineWidth: 0, 
    colorSpace: 'rgb',
    lineColor: new util.Color('lightgray'),
    fillColor: new util.Color('lightgray'),
    fillColor: 'lightgray',
    opacity: 1, depth: -10, interpolate: true,
  });
  
  dot3_timing_2 = new visual.Rect ({
    win: psychoJS.window, name: 'dot3_timing_2', units : 'height', 
    width: [0.2625, 0.03][0], height: [0.2625, 0.03][1],
    ori: 0, pos: [0, (- 0.07)],
    anchor: 'center',
    lineWidth: 0, 
    colorSpace: 'rgb',
    lineColor: new util.Color('lightgray'),
    fillColor: new util.Color('lightgray'),
    fillColor: 'lightgray',
    opacity: 1, depth: -11, interpolate: true,
  });
  
  dot4_timing_2 = new visual.Rect ({
    win: psychoJS.window, name: 'dot4_timing_2', units : 'height', 
    width: [0.35, 0.03][0], height: [0.35, 0.03][1],
    ori: 0, pos: [0, (- 0.07)],
    anchor: 'center',
    lineWidth: 0, 
    colorSpace: 'rgb',
    lineColor: new util.Color('lightgray'),
    fillColor: new util.Color('lightgray'),
    fillColor: 'lightgray',
    opacity: 1, depth: -12, interpolate: true,
  });
  
  // Initialize components for Routine "feedback_timing"
  feedback_timingClock = new util.Clock();
  feedback_text_timing = new visual.TextStim({
    win: psychoJS.window,
    name: 'feedback_text_timing',
    text: '',
    font: 'Arial',
    units: undefined, 
    pos: [0, 0], height: 0.05,  wrapWidth: undefined, ori: 0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: 1,
    depth: 0.0 
  });
  
  // Initialize components for Routine "instructions"
  instructionsClock = new util.Clock();
  instruct_image = new visual.ImageStim({
    win : psychoJS.window,
    name : 'instruct_image', units : undefined, 
    image : 'instructions/exp_ins.png', mask : undefined,
    anchor : 'center',
    ori : 0.0, pos : [0, 0], size : [1.33, 1],
    color : new util.Color([1,1,1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : 0.0 
  });
  instruct_resp = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
  
  // Initialize components for Routine "exp_demo"
  exp_demoClock = new util.Clock();
  exp_demo_movieClock = new util.Clock();
  exp_demo_movie = new visual.MovieStim({
    win: psychoJS.window,
    name: 'exp_demo_movie',
    units: psychoJS.window.units,
    movie: 'instructions/exp_demo.mp4',
    pos: [0, 0],
    anchor: 'center',
    size: [1.33, 1],
    ori: 0.0,
    opacity: undefined,
    loop: false,
    noAudio: false,
    depth: 0
    });
  exp_demo_key = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
  
  // Initialize components for Routine "trial"
  trialClock = new util.Clock();
  forcedRT_resp = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
  
  fixation = new visual.Rect ({
    win: psychoJS.window, name: 'fixation', units : 'height', 
    width: [0.35, 0.03][0], height: [0.35, 0.03][1],
    ori: 0, pos: [0, 0.07],
    anchor: 'center',
    lineWidth: 3, 
    colorSpace: 'rgb',
    lineColor: new util.Color('lightgray'),
    fillColor: undefined,
    fillColor: undefined,
    opacity: 1, depth: -3, interpolate: true,
  });
  
  dot1 = new visual.Rect ({
    win: psychoJS.window, name: 'dot1', units : 'height', 
    width: [0.0875, 0.03][0], height: [0.0875, 0.03][1],
    ori: 0, pos: [0, 0.07],
    anchor: 'center',
    lineWidth: 3, 
    colorSpace: 'rgb',
    lineColor: new util.Color('lightgray'),
    fillColor: new util.Color('lightgray'),
    fillColor: 'lightgray',
    opacity: 1, depth: -4, interpolate: true,
  });
  
  dot2 = new visual.Rect ({
    win: psychoJS.window, name: 'dot2', units : 'height', 
    width: [0.175, 0.03][0], height: [0.175, 0.03][1],
    ori: 0, pos: [0, 0.07],
    anchor: 'center',
    lineWidth: 3, 
    colorSpace: 'rgb',
    lineColor: new util.Color('lightgray'),
    fillColor: new util.Color('lightgray'),
    fillColor: 'lightgray',
    opacity: 1, depth: -5, interpolate: true,
  });
  
  dot3 = new visual.Rect ({
    win: psychoJS.window, name: 'dot3', units : 'height', 
    width: [0.2625, 0.03][0], height: [0.2625, 0.03][1],
    ori: 0, pos: [0, 0.07],
    anchor: 'center',
    lineWidth: 3, 
    colorSpace: 'rgb',
    lineColor: new util.Color('lightgray'),
    fillColor: new util.Color('lightgray'),
    fillColor: 'lightgray',
    opacity: 1, depth: -6, interpolate: true,
  });
  
  dot4 = new visual.Rect ({
    win: psychoJS.window, name: 'dot4', units : 'height', 
    width: [0.35, 0.03][0], height: [0.35, 0.03][1],
    ori: 0, pos: [0, 0.07],
    anchor: 'center',
    lineWidth: 3, 
    colorSpace: 'rgb',
    lineColor: new util.Color('lightgray'),
    fillColor: new util.Color('lightgray'),
    fillColor: 'lightgray',
    opacity: 1, depth: -7, interpolate: true,
  });
  
  fixation_2 = new visual.Rect ({
    win: psychoJS.window, name: 'fixation_2', units : 'height', 
    width: [0.35, 0.03][0], height: [0.35, 0.03][1],
    ori: 0, pos: [0, (- 0.07)],
    anchor: 'center',
    lineWidth: 3, 
    colorSpace: 'rgb',
    lineColor: new util.Color('lightgray'),
    fillColor: undefined,
    fillColor: undefined,
    opacity: 1, depth: -8, interpolate: true,
  });
  
  dot1_2 = new visual.Rect ({
    win: psychoJS.window, name: 'dot1_2', units : 'height', 
    width: [0.0875, 0.03][0], height: [0.0875, 0.03][1],
    ori: 0, pos: [0, (- 0.07)],
    anchor: 'center',
    lineWidth: 3, 
    colorSpace: 'rgb',
    lineColor: new util.Color('lightgray'),
    fillColor: new util.Color('lightgray'),
    fillColor: 'lightgray',
    opacity: 1, depth: -9, interpolate: true,
  });
  
  dot2_2 = new visual.Rect ({
    win: psychoJS.window, name: 'dot2_2', units : 'height', 
    width: [0.175, 0.03][0], height: [0.175, 0.03][1],
    ori: 0, pos: [0, (- 0.07)],
    anchor: 'center',
    lineWidth: 3, 
    colorSpace: 'rgb',
    lineColor: new util.Color('lightgray'),
    fillColor: new util.Color('lightgray'),
    fillColor: 'lightgray',
    opacity: 1, depth: -10, interpolate: true,
  });
  
  dot3_2 = new visual.Rect ({
    win: psychoJS.window, name: 'dot3_2', units : 'height', 
    width: [0.2625, 0.03][0], height: [0.2625, 0.03][1],
    ori: 0, pos: [0, (- 0.07)],
    anchor: 'center',
    lineWidth: 3, 
    colorSpace: 'rgb',
    lineColor: new util.Color('lightgray'),
    fillColor: new util.Color('lightgray'),
    fillColor: 'lightgray',
    opacity: 1, depth: -11, interpolate: true,
  });
  
  dot4_2 = new visual.Rect ({
    win: psychoJS.window, name: 'dot4_2', units : 'height', 
    width: [0.35, 0.03][0], height: [0.35, 0.03][1],
    ori: 0, pos: [0, (- 0.07)],
    anchor: 'center',
    lineWidth: 3, 
    colorSpace: 'rgb',
    lineColor: new util.Color('lightgray'),
    fillColor: new util.Color('lightgray'),
    fillColor: 'lightgray',
    opacity: 1, depth: -12, interpolate: true,
  });
  
  target = new visual.ImageStim({
    win : psychoJS.window,
    name : 'target', units : undefined, 
    image : 'default.png', mask : undefined,
    anchor : 'center',
    ori : 0.0, pos : [0, 0], size : size_fl,
    color : new util.Color([1,1,1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -13.0 
  });
  left1 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'left1', units : undefined, 
    image : 'default.png', mask : undefined,
    anchor : 'center',
    ori : 0.0, pos : [(- 0.07), 0], size : size_fl,
    color : new util.Color([1,1,1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -14.0 
  });
  left2 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'left2', units : undefined, 
    image : 'default.png', mask : undefined,
    anchor : 'center',
    ori : 0.0, pos : [(- 0.14), 0], size : size_fl,
    color : new util.Color([1,1,1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -15.0 
  });
  right1 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'right1', units : undefined, 
    image : 'default.png', mask : undefined,
    anchor : 'center',
    ori : 0.0, pos : [0.07, 0], size : size_fl,
    color : new util.Color([1,1,1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -16.0 
  });
  right2 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'right2', units : undefined, 
    image : 'default.png', mask : undefined,
    anchor : 'center',
    ori : 0.0, pos : [0.14, 0], size : size_fl,
    color : new util.Color([1,1,1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -17.0 
  });
  // Initialize components for Routine "feedback_test"
  feedback_testClock = new util.Clock();
  feedback_test_text = new visual.TextStim({
    win: psychoJS.window,
    name: 'feedback_test_text',
    text: '',
    font: 'Arial',
    units: undefined, 
    pos: [0, 0], height: 0.05,  wrapWidth: undefined, ori: 0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: 1,
    depth: 0.0 
  });
  
  wait_text = new visual.TextStim({
    win: psychoJS.window,
    name: 'wait_text',
    text: ' ',
    font: 'Open Sans',
    units: undefined, 
    pos: [0, 0], height: 0.1,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: undefined,
    depth: -1.0 
  });
  
  // Initialize components for Routine "end_block"
  end_blockClock = new util.Clock();
  // Run 'Begin Experiment' code from rest_code
  block_id = 1;
  
  block_text = new visual.TextStim({
    win: psychoJS.window,
    name: 'block_text',
    text: '',
    font: 'Arial',
    units: undefined, 
    pos: [0, 0.2], height: 0.025,  wrapWidth: undefined, ori: 0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: 1,
    depth: -1.0 
  });
  
  rest_text = new visual.TextStim({
    win: psychoJS.window,
    name: 'rest_text',
    text: 'Feel free to relax for a moment. \n\nPress the SPACE BAR when you are ready to start.',
    font: 'Arial',
    units: undefined, 
    pos: [0, 0], height: 0.025,  wrapWidth: undefined, ori: 0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: 1,
    depth: -2.0 
  });
  
  rest_key = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
  
  // Initialize components for Routine "end_study"
  end_studyClock = new util.Clock();
  study_over = new visual.TextStim({
    win: psychoJS.window,
    name: 'study_over',
    text: 'End of Task!\n\nYou will be directed to a survey to answer a few simple questions. \n\nPress the SPACE BAR to continue. Please wait until you see the THANK YOU box!',
    font: 'Arial',
    units: undefined, 
    pos: [0, 0], height: 0.03,  wrapWidth: undefined, ori: 0,
    languageStyle: 'LTR',
    color: new util.Color('lightgray'),  opacity: 1,
    depth: 0.0 
  });
  
  exit_resp = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
  
  // Create some handy timers
  globalClock = new util.Clock();  // to track the time since experiment started
  routineTimer = new util.CountdownTimer();  // to track time remaining of each (non-slip) routine
  
  return Scheduler.Event.NEXT;
}


var t;
var frameN;
var continueRoutine;
var fps;
var fps_cutoff;
var fpsCheckComponents;
function fpsCheckRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'fpsCheck' ---
    t = 0;
    fpsCheckClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    psychoJS.experiment.addData('fpsCheck.started', globalClock.getTime());
    // Run 'Begin Routine' code from code_7
    fps = util.round(expInfo["frameRate"]);
    console.log(fps);
    fps_cutoff = 59;
    if ((fps >= fps_cutoff)) {
        continueRoutine = false;
        console.log("fps check passed");
    }
    
    // keep track of which components have finished
    fpsCheckComponents = [];
    fpsCheckComponents.push(text_4);
    
    for (const thisComponent of fpsCheckComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function fpsCheckRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'fpsCheck' ---
    // get current time
    t = fpsCheckClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *text_4* updates
    if (t >= 0.0 && text_4.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      text_4.tStart = t;  // (not accounting for frame time here)
      text_4.frameNStart = frameN;  // exact frame index
      
      text_4.setAutoDraw(true);
    }
    
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    for (const thisComponent of fpsCheckComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function fpsCheckRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'fpsCheck' ---
    for (const thisComponent of fpsCheckComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    psychoJS.experiment.addData('fpsCheck.stopped', globalClock.getTime());
    // the Routine "fpsCheck" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var exp_setupComponents;
function exp_setupRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'exp_setup' ---
    t = 0;
    exp_setupClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    // keep track of which components have finished
    exp_setupComponents = [];
    
    for (const thisComponent of exp_setupComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function exp_setupRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'exp_setup' ---
    // get current time
    t = exp_setupClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    for (const thisComponent of exp_setupComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function exp_setupRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'exp_setup' ---
    for (const thisComponent of exp_setupComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    // the Routine "exp_setup" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var _instruct_resp_fl_allKeys;
var instructions_flankerComponents;
function instructions_flankerRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'instructions_flanker' ---
    t = 0;
    instructions_flankerClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    instruct_resp_fl.keys = undefined;
    instruct_resp_fl.rt = undefined;
    _instruct_resp_fl_allKeys = [];
    // keep track of which components have finished
    instructions_flankerComponents = [];
    instructions_flankerComponents.push(free_ins_image);
    instructions_flankerComponents.push(instruct_resp_fl);
    
    for (const thisComponent of instructions_flankerComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function instructions_flankerRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'instructions_flanker' ---
    // get current time
    t = instructions_flankerClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *free_ins_image* updates
    if (t >= 0.0 && free_ins_image.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      free_ins_image.tStart = t;  // (not accounting for frame time here)
      free_ins_image.frameNStart = frameN;  // exact frame index
      
      free_ins_image.setAutoDraw(true);
    }
    
    
    // *instruct_resp_fl* updates
    if (t >= 0.0 && instruct_resp_fl.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      instruct_resp_fl.tStart = t;  // (not accounting for frame time here)
      instruct_resp_fl.frameNStart = frameN;  // exact frame index
      
      // keyboard checking is just starting
      psychoJS.window.callOnFlip(function() { instruct_resp_fl.clock.reset(); });  // t=0 on next screen flip
      psychoJS.window.callOnFlip(function() { instruct_resp_fl.start(); }); // start on screen flip
      psychoJS.window.callOnFlip(function() { instruct_resp_fl.clearEvents(); });
    }
    
    if (instruct_resp_fl.status === PsychoJS.Status.STARTED) {
      let theseKeys = instruct_resp_fl.getKeys({keyList: ['space', '6'], waitRelease: false});
      _instruct_resp_fl_allKeys = _instruct_resp_fl_allKeys.concat(theseKeys);
      if (_instruct_resp_fl_allKeys.length > 0) {
        instruct_resp_fl.keys = _instruct_resp_fl_allKeys[_instruct_resp_fl_allKeys.length - 1].name;  // just the last key pressed
        instruct_resp_fl.rt = _instruct_resp_fl_allKeys[_instruct_resp_fl_allKeys.length - 1].rt;
        instruct_resp_fl.duration = _instruct_resp_fl_allKeys[_instruct_resp_fl_allKeys.length - 1].duration;
        // a response ends the routine
        continueRoutine = false;
      }
    }
    
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    for (const thisComponent of instructions_flankerComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


var nReps_free_demo;
function instructions_flankerRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'instructions_flanker' ---
    for (const thisComponent of instructions_flankerComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    // Run 'End Routine' code from code
    nReps_free_demo = 99;
    if ((instruct_resp_fl.keys === "6")) {
        nReps_freeRT = 0;
        nReps_free_demo = 0;
    }
    
    instruct_resp_fl.stop();
    // the Routine "instructions_flanker" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var free_demo_loop;
function free_demo_loopLoopBegin(free_demo_loopLoopScheduler, snapshot) {
  return async function() {
    TrialHandler.fromSnapshot(snapshot); // update internal variables (.thisN etc) of the loop
    
    // set up handler to look after randomisation of conditions etc
    free_demo_loop = new TrialHandler({
      psychoJS: psychoJS,
      nReps: nReps_free_demo, method: TrialHandler.Method.RANDOM,
      extraInfo: expInfo, originPath: undefined,
      trialList: undefined,
      seed: undefined, name: 'free_demo_loop'
    });
    psychoJS.experiment.addLoop(free_demo_loop); // add the loop to the experiment
    currentLoop = free_demo_loop;  // we're now the current loop
    
    // Schedule all the trials in the trialList:
    for (const thisFree_demo_loop of free_demo_loop) {
      snapshot = free_demo_loop.getSnapshot();
      free_demo_loopLoopScheduler.add(importConditions(snapshot));
      free_demo_loopLoopScheduler.add(free_demoRoutineBegin(snapshot));
      free_demo_loopLoopScheduler.add(free_demoRoutineEachFrame());
      free_demo_loopLoopScheduler.add(free_demoRoutineEnd(snapshot));
      free_demo_loopLoopScheduler.add(free_demo_loopLoopEndIteration(free_demo_loopLoopScheduler, snapshot));
    }
    
    return Scheduler.Event.NEXT;
  }
}


async function free_demo_loopLoopEnd() {
  // terminate loop
  psychoJS.experiment.removeLoop(free_demo_loop);
  // update the current loop from the ExperimentHandler
  if (psychoJS.experiment._unfinishedLoops.length>0)
    currentLoop = psychoJS.experiment._unfinishedLoops.at(-1);
  else
    currentLoop = psychoJS.experiment;  // so we use addData from the experiment
  return Scheduler.Event.NEXT;
}


function free_demo_loopLoopEndIteration(scheduler, snapshot) {
  // ------Prepare for next entry------
  return async function () {
    if (typeof snapshot !== 'undefined') {
      // ------Check if user ended loop early------
      if (snapshot.finished) {
        // Check for and save orphaned data
        if (psychoJS.experiment.isEntryEmpty()) {
          psychoJS.experiment.nextEntry(snapshot);
        }
        scheduler.stop();
      }
    return Scheduler.Event.NEXT;
    }
  };
}


var trial_train_free;
function trial_train_freeLoopBegin(trial_train_freeLoopScheduler, snapshot) {
  return async function() {
    TrialHandler.fromSnapshot(snapshot); // update internal variables (.thisN etc) of the loop
    
    // set up handler to look after randomisation of conditions etc
    trial_train_free = new TrialHandler({
      psychoJS: psychoJS,
      nReps: nReps_freeRT, method: TrialHandler.Method.FULLRANDOM,
      extraInfo: expInfo, originPath: undefined,
      trialList: 'conditions.xlsx',
      seed: undefined, name: 'trial_train_free'
    });
    psychoJS.experiment.addLoop(trial_train_free); // add the loop to the experiment
    currentLoop = trial_train_free;  // we're now the current loop
    
    // Schedule all the trials in the trialList:
    for (const thisTrial_train_free of trial_train_free) {
      snapshot = trial_train_free.getSnapshot();
      trial_train_freeLoopScheduler.add(importConditions(snapshot));
      trial_train_freeLoopScheduler.add(freeRoutineBegin(snapshot));
      trial_train_freeLoopScheduler.add(freeRoutineEachFrame());
      trial_train_freeLoopScheduler.add(freeRoutineEnd(snapshot));
      trial_train_freeLoopScheduler.add(feedbackRoutineBegin(snapshot));
      trial_train_freeLoopScheduler.add(feedbackRoutineEachFrame());
      trial_train_freeLoopScheduler.add(feedbackRoutineEnd(snapshot));
      trial_train_freeLoopScheduler.add(fail_taskRoutineBegin(snapshot));
      trial_train_freeLoopScheduler.add(fail_taskRoutineEachFrame());
      trial_train_freeLoopScheduler.add(fail_taskRoutineEnd(snapshot));
      trial_train_freeLoopScheduler.add(trial_train_freeLoopEndIteration(trial_train_freeLoopScheduler, snapshot));
    }
    
    return Scheduler.Event.NEXT;
  }
}


async function trial_train_freeLoopEnd() {
  // terminate loop
  psychoJS.experiment.removeLoop(trial_train_free);
  // update the current loop from the ExperimentHandler
  if (psychoJS.experiment._unfinishedLoops.length>0)
    currentLoop = psychoJS.experiment._unfinishedLoops.at(-1);
  else
    currentLoop = psychoJS.experiment;  // so we use addData from the experiment
  return Scheduler.Event.NEXT;
}


function trial_train_freeLoopEndIteration(scheduler, snapshot) {
  // ------Prepare for next entry------
  return async function () {
    if (typeof snapshot !== 'undefined') {
      // ------Check if user ended loop early------
      if (snapshot.finished) {
        // Check for and save orphaned data
        if (psychoJS.experiment.isEntryEmpty()) {
          psychoJS.experiment.nextEntry(snapshot);
        }
        scheduler.stop();
      } else {
        psychoJS.experiment.nextEntry(snapshot);
      }
    return Scheduler.Event.NEXT;
    }
  };
}


var timing_demo_loop;
function timing_demo_loopLoopBegin(timing_demo_loopLoopScheduler, snapshot) {
  return async function() {
    TrialHandler.fromSnapshot(snapshot); // update internal variables (.thisN etc) of the loop
    
    // set up handler to look after randomisation of conditions etc
    timing_demo_loop = new TrialHandler({
      psychoJS: psychoJS,
      nReps: nReps_timing_demo, method: TrialHandler.Method.RANDOM,
      extraInfo: expInfo, originPath: undefined,
      trialList: undefined,
      seed: undefined, name: 'timing_demo_loop'
    });
    psychoJS.experiment.addLoop(timing_demo_loop); // add the loop to the experiment
    currentLoop = timing_demo_loop;  // we're now the current loop
    
    // Schedule all the trials in the trialList:
    for (const thisTiming_demo_loop of timing_demo_loop) {
      snapshot = timing_demo_loop.getSnapshot();
      timing_demo_loopLoopScheduler.add(importConditions(snapshot));
      timing_demo_loopLoopScheduler.add(timing_demoRoutineBegin(snapshot));
      timing_demo_loopLoopScheduler.add(timing_demoRoutineEachFrame());
      timing_demo_loopLoopScheduler.add(timing_demoRoutineEnd(snapshot));
      timing_demo_loopLoopScheduler.add(timing_demo_loopLoopEndIteration(timing_demo_loopLoopScheduler, snapshot));
    }
    
    return Scheduler.Event.NEXT;
  }
}


async function timing_demo_loopLoopEnd() {
  // terminate loop
  psychoJS.experiment.removeLoop(timing_demo_loop);
  // update the current loop from the ExperimentHandler
  if (psychoJS.experiment._unfinishedLoops.length>0)
    currentLoop = psychoJS.experiment._unfinishedLoops.at(-1);
  else
    currentLoop = psychoJS.experiment;  // so we use addData from the experiment
  return Scheduler.Event.NEXT;
}


function timing_demo_loopLoopEndIteration(scheduler, snapshot) {
  // ------Prepare for next entry------
  return async function () {
    if (typeof snapshot !== 'undefined') {
      // ------Check if user ended loop early------
      if (snapshot.finished) {
        // Check for and save orphaned data
        if (psychoJS.experiment.isEntryEmpty()) {
          psychoJS.experiment.nextEntry(snapshot);
        }
        scheduler.stop();
      }
    return Scheduler.Event.NEXT;
    }
  };
}


var trial_train_timing;
function trial_train_timingLoopBegin(trial_train_timingLoopScheduler, snapshot) {
  return async function() {
    TrialHandler.fromSnapshot(snapshot); // update internal variables (.thisN etc) of the loop
    
    // set up handler to look after randomisation of conditions etc
    trial_train_timing = new TrialHandler({
      psychoJS: psychoJS,
      nReps: nReps_timing, method: TrialHandler.Method.RANDOM,
      extraInfo: expInfo, originPath: undefined,
      trialList: undefined,
      seed: undefined, name: 'trial_train_timing'
    });
    psychoJS.experiment.addLoop(trial_train_timing); // add the loop to the experiment
    currentLoop = trial_train_timing;  // we're now the current loop
    
    // Schedule all the trials in the trialList:
    for (const thisTrial_train_timing of trial_train_timing) {
      snapshot = trial_train_timing.getSnapshot();
      trial_train_timingLoopScheduler.add(importConditions(snapshot));
      trial_train_timingLoopScheduler.add(timingRoutineBegin(snapshot));
      trial_train_timingLoopScheduler.add(timingRoutineEachFrame());
      trial_train_timingLoopScheduler.add(timingRoutineEnd(snapshot));
      trial_train_timingLoopScheduler.add(feedback_timingRoutineBegin(snapshot));
      trial_train_timingLoopScheduler.add(feedback_timingRoutineEachFrame());
      trial_train_timingLoopScheduler.add(feedback_timingRoutineEnd(snapshot));
      trial_train_timingLoopScheduler.add(fail_taskRoutineBegin(snapshot));
      trial_train_timingLoopScheduler.add(fail_taskRoutineEachFrame());
      trial_train_timingLoopScheduler.add(fail_taskRoutineEnd(snapshot));
      trial_train_timingLoopScheduler.add(trial_train_timingLoopEndIteration(trial_train_timingLoopScheduler, snapshot));
    }
    
    return Scheduler.Event.NEXT;
  }
}


async function trial_train_timingLoopEnd() {
  // terminate loop
  psychoJS.experiment.removeLoop(trial_train_timing);
  // update the current loop from the ExperimentHandler
  if (psychoJS.experiment._unfinishedLoops.length>0)
    currentLoop = psychoJS.experiment._unfinishedLoops.at(-1);
  else
    currentLoop = psychoJS.experiment;  // so we use addData from the experiment
  return Scheduler.Event.NEXT;
}


function trial_train_timingLoopEndIteration(scheduler, snapshot) {
  // ------Prepare for next entry------
  return async function () {
    if (typeof snapshot !== 'undefined') {
      // ------Check if user ended loop early------
      if (snapshot.finished) {
        // Check for and save orphaned data
        if (psychoJS.experiment.isEntryEmpty()) {
          psychoJS.experiment.nextEntry(snapshot);
        }
        scheduler.stop();
      } else {
        psychoJS.experiment.nextEntry(snapshot);
      }
    return Scheduler.Event.NEXT;
    }
  };
}


var exp_demo_loop;
function exp_demo_loopLoopBegin(exp_demo_loopLoopScheduler, snapshot) {
  return async function() {
    TrialHandler.fromSnapshot(snapshot); // update internal variables (.thisN etc) of the loop
    
    // set up handler to look after randomisation of conditions etc
    exp_demo_loop = new TrialHandler({
      psychoJS: psychoJS,
      nReps: 99, method: TrialHandler.Method.RANDOM,
      extraInfo: expInfo, originPath: undefined,
      trialList: undefined,
      seed: undefined, name: 'exp_demo_loop'
    });
    psychoJS.experiment.addLoop(exp_demo_loop); // add the loop to the experiment
    currentLoop = exp_demo_loop;  // we're now the current loop
    
    // Schedule all the trials in the trialList:
    for (const thisExp_demo_loop of exp_demo_loop) {
      snapshot = exp_demo_loop.getSnapshot();
      exp_demo_loopLoopScheduler.add(importConditions(snapshot));
      exp_demo_loopLoopScheduler.add(exp_demoRoutineBegin(snapshot));
      exp_demo_loopLoopScheduler.add(exp_demoRoutineEachFrame());
      exp_demo_loopLoopScheduler.add(exp_demoRoutineEnd(snapshot));
      exp_demo_loopLoopScheduler.add(exp_demo_loopLoopEndIteration(exp_demo_loopLoopScheduler, snapshot));
    }
    
    return Scheduler.Event.NEXT;
  }
}


async function exp_demo_loopLoopEnd() {
  // terminate loop
  psychoJS.experiment.removeLoop(exp_demo_loop);
  // update the current loop from the ExperimentHandler
  if (psychoJS.experiment._unfinishedLoops.length>0)
    currentLoop = psychoJS.experiment._unfinishedLoops.at(-1);
  else
    currentLoop = psychoJS.experiment;  // so we use addData from the experiment
  return Scheduler.Event.NEXT;
}


function exp_demo_loopLoopEndIteration(scheduler, snapshot) {
  // ------Prepare for next entry------
  return async function () {
    if (typeof snapshot !== 'undefined') {
      // ------Check if user ended loop early------
      if (snapshot.finished) {
        // Check for and save orphaned data
        if (psychoJS.experiment.isEntryEmpty()) {
          psychoJS.experiment.nextEntry(snapshot);
        }
        scheduler.stop();
      }
    return Scheduler.Event.NEXT;
    }
  };
}


var blocks;
function blocksLoopBegin(blocksLoopScheduler, snapshot) {
  return async function() {
    TrialHandler.fromSnapshot(snapshot); // update internal variables (.thisN etc) of the loop
    
    // set up handler to look after randomisation of conditions etc
    blocks = new TrialHandler({
      psychoJS: psychoJS,
      nReps: nBlocks, method: TrialHandler.Method.SEQUENTIAL,
      extraInfo: expInfo, originPath: undefined,
      trialList: undefined,
      seed: undefined, name: 'blocks'
    });
    psychoJS.experiment.addLoop(blocks); // add the loop to the experiment
    currentLoop = blocks;  // we're now the current loop
    
    // Schedule all the trials in the trialList:
    for (const thisBlock of blocks) {
      snapshot = blocks.getSnapshot();
      blocksLoopScheduler.add(importConditions(snapshot));
      blocksLoopScheduler.add(get_readyRoutineBegin(snapshot));
      blocksLoopScheduler.add(get_readyRoutineEachFrame());
      blocksLoopScheduler.add(get_readyRoutineEnd(snapshot));
      const trialsLoopScheduler = new Scheduler(psychoJS);
      blocksLoopScheduler.add(trialsLoopBegin(trialsLoopScheduler, snapshot));
      blocksLoopScheduler.add(trialsLoopScheduler);
      blocksLoopScheduler.add(trialsLoopEnd);
      blocksLoopScheduler.add(end_blockRoutineBegin(snapshot));
      blocksLoopScheduler.add(end_blockRoutineEachFrame());
      blocksLoopScheduler.add(end_blockRoutineEnd(snapshot));
      blocksLoopScheduler.add(blocksLoopEndIteration(blocksLoopScheduler, snapshot));
    }
    
    return Scheduler.Event.NEXT;
  }
}


var trials;
function trialsLoopBegin(trialsLoopScheduler, snapshot) {
  return async function() {
    TrialHandler.fromSnapshot(snapshot); // update internal variables (.thisN etc) of the loop
    
    // set up handler to look after randomisation of conditions etc
    trials = new TrialHandler({
      psychoJS: psychoJS,
      nReps: nReps_forcedRT, method: TrialHandler.Method.FULLRANDOM,
      extraInfo: expInfo, originPath: undefined,
      trialList: 'conditions.xlsx',
      seed: undefined, name: 'trials'
    });
    psychoJS.experiment.addLoop(trials); // add the loop to the experiment
    currentLoop = trials;  // we're now the current loop
    
    // Schedule all the trials in the trialList:
    for (const thisTrial of trials) {
      snapshot = trials.getSnapshot();
      trialsLoopScheduler.add(importConditions(snapshot));
      trialsLoopScheduler.add(trialRoutineBegin(snapshot));
      trialsLoopScheduler.add(trialRoutineEachFrame());
      trialsLoopScheduler.add(trialRoutineEnd(snapshot));
      trialsLoopScheduler.add(feedback_testRoutineBegin(snapshot));
      trialsLoopScheduler.add(feedback_testRoutineEachFrame());
      trialsLoopScheduler.add(feedback_testRoutineEnd(snapshot));
      trialsLoopScheduler.add(trialsLoopEndIteration(trialsLoopScheduler, snapshot));
    }
    
    return Scheduler.Event.NEXT;
  }
}


async function trialsLoopEnd() {
  // terminate loop
  psychoJS.experiment.removeLoop(trials);
  // update the current loop from the ExperimentHandler
  if (psychoJS.experiment._unfinishedLoops.length>0)
    currentLoop = psychoJS.experiment._unfinishedLoops.at(-1);
  else
    currentLoop = psychoJS.experiment;  // so we use addData from the experiment
  return Scheduler.Event.NEXT;
}


function trialsLoopEndIteration(scheduler, snapshot) {
  // ------Prepare for next entry------
  return async function () {
    if (typeof snapshot !== 'undefined') {
      // ------Check if user ended loop early------
      if (snapshot.finished) {
        // Check for and save orphaned data
        if (psychoJS.experiment.isEntryEmpty()) {
          psychoJS.experiment.nextEntry(snapshot);
        }
        scheduler.stop();
      } else {
        psychoJS.experiment.nextEntry(snapshot);
      }
    return Scheduler.Event.NEXT;
    }
  };
}


async function blocksLoopEnd() {
  // terminate loop
  psychoJS.experiment.removeLoop(blocks);
  // update the current loop from the ExperimentHandler
  if (psychoJS.experiment._unfinishedLoops.length>0)
    currentLoop = psychoJS.experiment._unfinishedLoops.at(-1);
  else
    currentLoop = psychoJS.experiment;  // so we use addData from the experiment
  return Scheduler.Event.NEXT;
}


function blocksLoopEndIteration(scheduler, snapshot) {
  // ------Prepare for next entry------
  return async function () {
    if (typeof snapshot !== 'undefined') {
      // ------Check if user ended loop early------
      if (snapshot.finished) {
        // Check for and save orphaned data
        if (psychoJS.experiment.isEntryEmpty()) {
          psychoJS.experiment.nextEntry(snapshot);
        }
        scheduler.stop();
      }
    return Scheduler.Event.NEXT;
    }
  };
}


var _free_demo_key_allKeys;
var free_demoComponents;
function free_demoRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'free_demo' ---
    t = 0;
    free_demoClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    free_demo_key.keys = undefined;
    free_demo_key.rt = undefined;
    _free_demo_key_allKeys = [];
    // keep track of which components have finished
    free_demoComponents = [];
    free_demoComponents.push(free_demo_movie);
    free_demoComponents.push(free_demo_key);
    
    for (const thisComponent of free_demoComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function free_demoRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'free_demo' ---
    // get current time
    t = free_demoClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *free_demo_movie* updates
    if (t >= 0.0 && free_demo_movie.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      free_demo_movie.tStart = t;  // (not accounting for frame time here)
      free_demo_movie.frameNStart = frameN;  // exact frame index
      
      free_demo_movie.setAutoDraw(true);
      free_demo_movie.play();
    }
    
    
    // *free_demo_key* updates
    if (t >= 10 && free_demo_key.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      free_demo_key.tStart = t;  // (not accounting for frame time here)
      free_demo_key.frameNStart = frameN;  // exact frame index
      
      // keyboard checking is just starting
      psychoJS.window.callOnFlip(function() { free_demo_key.clock.reset(); });  // t=0 on next screen flip
      psychoJS.window.callOnFlip(function() { free_demo_key.start(); }); // start on screen flip
      psychoJS.window.callOnFlip(function() { free_demo_key.clearEvents(); });
    }
    
    if (free_demo_key.status === PsychoJS.Status.STARTED) {
      let theseKeys = free_demo_key.getKeys({keyList: ['r', 'space'], waitRelease: false});
      _free_demo_key_allKeys = _free_demo_key_allKeys.concat(theseKeys);
      if (_free_demo_key_allKeys.length > 0) {
        free_demo_key.keys = _free_demo_key_allKeys[_free_demo_key_allKeys.length - 1].name;  // just the last key pressed
        free_demo_key.rt = _free_demo_key_allKeys[_free_demo_key_allKeys.length - 1].rt;
        free_demo_key.duration = _free_demo_key_allKeys[_free_demo_key_allKeys.length - 1].duration;
        // a response ends the routine
        continueRoutine = false;
      }
    }
    
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    for (const thisComponent of free_demoComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function free_demoRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'free_demo' ---
    for (const thisComponent of free_demoComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    free_demo_movie.stop();  // ensure movie has stopped at end of Routine
    free_demo_key.stop();
    // Run 'End Routine' code from free_demo_code
    if ((free_demo_key.keys === "space")) {
        free_demo_loop.finished = 1;
    }
    
    // the Routine "free_demo" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var get_readyComponents;
function get_readyRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'get_ready' ---
    t = 0;
    get_readyClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    routineTimer.add(2.000000);
    // update component parameters for each repeat
    // keep track of which components have finished
    get_readyComponents = [];
    get_readyComponents.push(ready_text);
    
    for (const thisComponent of get_readyComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


var frameRemains;
function get_readyRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'get_ready' ---
    // get current time
    t = get_readyClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *ready_text* updates
    if (t >= 0.0 && ready_text.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      ready_text.tStart = t;  // (not accounting for frame time here)
      ready_text.frameNStart = frameN;  // exact frame index
      
      ready_text.setAutoDraw(true);
    }
    
    frameRemains = 0.0 + 2 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (ready_text.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      ready_text.setAutoDraw(false);
    }
    
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    for (const thisComponent of get_readyComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
    // refresh the screen if continuing
    if (continueRoutine && routineTimer.getTime() > 0) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function get_readyRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'get_ready' ---
    for (const thisComponent of get_readyComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var fullscreen;
var target_onset;
var _trial_resp_fl_allKeys;
var freeComponents;
function freeRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'free' ---
    t = 0;
    freeClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    psychoJS.experiment.addData('free.started', globalClock.getTime());
    //check full screen (js only)
    fullscreen = psychoJS.window._windowAlreadyInFullScreen
    psychoJS.experiment.addData('fullscreen', fullscreen)
    
    if ((! fullscreen)) {
        throw new Error('You have exited fullscreen mode. The task will terminate. Please return your submission.');
    }
    
    // Run 'Begin Routine' code from trial_code_fl
    target_onset = (util.randint(0, 50) / 50);
    psychoJS.experiment.addData("target_onset", target_onset);
    console.log("target_onset", target_onset);
    
    target_fl.setImage(tar_arrow);
    left1_fl.setImage(dis_arrow);
    left2_fl.setImage(dis_arrow);
    right1_fl.setImage(dis_arrow);
    right2_fl.setImage(dis_arrow);
    trial_resp_fl.keys = undefined;
    trial_resp_fl.rt = undefined;
    _trial_resp_fl_allKeys = [];
    // keep track of which components have finished
    freeComponents = [];
    freeComponents.push(fixation_fl);
    freeComponents.push(fixation_fl_2);
    freeComponents.push(w_prompt);
    freeComponents.push(p_prompt);
    freeComponents.push(target_fl);
    freeComponents.push(left1_fl);
    freeComponents.push(left2_fl);
    freeComponents.push(right1_fl);
    freeComponents.push(right2_fl);
    freeComponents.push(trial_resp_fl);
    
    for (const thisComponent of freeComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function freeRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'free' ---
    // get current time
    t = freeClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *fixation_fl* updates
    if (t >= 0.0 && fixation_fl.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      fixation_fl.tStart = t;  // (not accounting for frame time here)
      fixation_fl.frameNStart = frameN;  // exact frame index
      
      fixation_fl.setAutoDraw(true);
    }
    
    
    // *fixation_fl_2* updates
    if (t >= 0.0 && fixation_fl_2.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      fixation_fl_2.tStart = t;  // (not accounting for frame time here)
      fixation_fl_2.frameNStart = frameN;  // exact frame index
      
      fixation_fl_2.setAutoDraw(true);
    }
    
    
    // *w_prompt* updates
    if (t >= 0.0 && w_prompt.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      w_prompt.tStart = t;  // (not accounting for frame time here)
      w_prompt.frameNStart = frameN;  // exact frame index
      
      w_prompt.setAutoDraw(true);
    }
    
    
    // *p_prompt* updates
    if (t >= 0.0 && p_prompt.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      p_prompt.tStart = t;  // (not accounting for frame time here)
      p_prompt.frameNStart = frameN;  // exact frame index
      
      p_prompt.setAutoDraw(true);
    }
    
    
    // *target_fl* updates
    if (t >= target_onset && target_fl.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      target_fl.tStart = t;  // (not accounting for frame time here)
      target_fl.frameNStart = frameN;  // exact frame index
      
      target_fl.setAutoDraw(true);
    }
    
    
    // *left1_fl* updates
    if (t >= target_onset && left1_fl.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      left1_fl.tStart = t;  // (not accounting for frame time here)
      left1_fl.frameNStart = frameN;  // exact frame index
      
      left1_fl.setAutoDraw(true);
    }
    
    
    // *left2_fl* updates
    if (t >= target_onset && left2_fl.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      left2_fl.tStart = t;  // (not accounting for frame time here)
      left2_fl.frameNStart = frameN;  // exact frame index
      
      left2_fl.setAutoDraw(true);
    }
    
    
    // *right1_fl* updates
    if (t >= target_onset && right1_fl.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      right1_fl.tStart = t;  // (not accounting for frame time here)
      right1_fl.frameNStart = frameN;  // exact frame index
      
      right1_fl.setAutoDraw(true);
    }
    
    
    // *right2_fl* updates
    if (t >= target_onset && right2_fl.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      right2_fl.tStart = t;  // (not accounting for frame time here)
      right2_fl.frameNStart = frameN;  // exact frame index
      
      right2_fl.setAutoDraw(true);
    }
    
    
    // *trial_resp_fl* updates
    if (t >= target_onset && trial_resp_fl.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      trial_resp_fl.tStart = t;  // (not accounting for frame time here)
      trial_resp_fl.frameNStart = frameN;  // exact frame index
      
      // keyboard checking is just starting
      trial_resp_fl.clock.reset();
      trial_resp_fl.start();
      trial_resp_fl.clearEvents();
    }
    
    if (trial_resp_fl.status === PsychoJS.Status.STARTED) {
      let theseKeys = trial_resp_fl.getKeys({keyList: ['w', 'p'], waitRelease: false});
      _trial_resp_fl_allKeys = _trial_resp_fl_allKeys.concat(theseKeys);
      if (_trial_resp_fl_allKeys.length > 0) {
        trial_resp_fl.keys = _trial_resp_fl_allKeys[0].name;  // just the first key pressed
        trial_resp_fl.rt = _trial_resp_fl_allKeys[0].rt;
        trial_resp_fl.duration = _trial_resp_fl_allKeys[0].duration;
        // was this correct?
        if (trial_resp_fl.keys == target_resp) {
            trial_resp_fl.corr = 1;
        } else {
            trial_resp_fl.corr = 0;
        }
        // a response ends the routine
        continueRoutine = false;
      }
    }
    
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    for (const thisComponent of freeComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


var feedback_msg;
function freeRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'free' ---
    for (const thisComponent of freeComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    psychoJS.experiment.addData('free.stopped', globalClock.getTime());
    // Run 'End Routine' code from trial_code_fl
    if ((trial_resp_fl.corr === 1)) {
        feedback_msg = "Correct!";
        acc_free.push(1);
    } else {
        feedback_msg = "Wrong!";
        acc_free.push(0);
    }
    console.log("len(acc_free)", acc_free.length);
    if ((acc_free.length >= 40)) {
        acc_free_last20 = (util.sum(acc_free.slice((- 20))) / acc_free.slice((- 20)).length);
        console.log("acc_free_last20", acc_free_last20);
        if ((acc_free_last20 >= 0.85)) {
            trial_train_free.finished = true;
        }
    }
    if ((acc_free.length > 80)) {
        terminate_task = true;
    }
    
    // was no response the correct answer?!
    if (trial_resp_fl.keys === undefined) {
      if (['None','none',undefined].includes(target_resp)) {
         trial_resp_fl.corr = 1;  // correct non-response
      } else {
         trial_resp_fl.corr = 0;  // failed to respond (incorrectly)
      }
    }
    // store data for current loop
    // update the trial handler
    if (currentLoop instanceof MultiStairHandler) {
      currentLoop.addResponse(trial_resp_fl.corr, level);
    }
    psychoJS.experiment.addData('trial_resp_fl.keys', trial_resp_fl.keys);
    psychoJS.experiment.addData('trial_resp_fl.corr', trial_resp_fl.corr);
    if (typeof trial_resp_fl.keys !== 'undefined') {  // we had a response
        psychoJS.experiment.addData('trial_resp_fl.rt', trial_resp_fl.rt);
        psychoJS.experiment.addData('trial_resp_fl.duration', trial_resp_fl.duration);
        routineTimer.reset();
        }
    
    trial_resp_fl.stop();
    // the Routine "free" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var feedbackComponents;
function feedbackRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'feedback' ---
    t = 0;
    feedbackClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    routineTimer.add(0.400000);
    // update component parameters for each repeat
    psychoJS.experiment.addData('feedback.started', globalClock.getTime());
    feedback_text.setColor(new util.Color('lightgray'));
    feedback_text.setText(feedback_msg);
    // keep track of which components have finished
    feedbackComponents = [];
    feedbackComponents.push(feedback_text);
    
    for (const thisComponent of feedbackComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function feedbackRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'feedback' ---
    // get current time
    t = feedbackClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *feedback_text* updates
    if (t >= 0 && feedback_text.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      feedback_text.tStart = t;  // (not accounting for frame time here)
      feedback_text.frameNStart = frameN;  // exact frame index
      
      feedback_text.setAutoDraw(true);
    }
    
    frameRemains = 0.4  - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if ((feedback_text.status === PsychoJS.Status.STARTED || feedback_text.status === PsychoJS.Status.FINISHED) && t >= frameRemains) {
      feedback_text.setAutoDraw(false);
    }
    
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    for (const thisComponent of feedbackComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
    // refresh the screen if continuing
    if (continueRoutine && routineTimer.getTime() > 0) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function feedbackRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'feedback' ---
    for (const thisComponent of feedbackComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    psychoJS.experiment.addData('feedback.stopped', globalClock.getTime());
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var fail_taskComponents;
function fail_taskRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'fail_task' ---
    t = 0;
    fail_taskClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    psychoJS.experiment.addData('fail_task.started', globalClock.getTime());
    // Run 'Begin Routine' code from code_8
    continueRoutine = terminate_task;
    
    // keep track of which components have finished
    fail_taskComponents = [];
    fail_taskComponents.push(text_5);
    
    for (const thisComponent of fail_taskComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function fail_taskRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'fail_task' ---
    // get current time
    t = fail_taskClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *text_5* updates
    if (t >= 0.0 && text_5.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      text_5.tStart = t;  // (not accounting for frame time here)
      text_5.frameNStart = frameN;  // exact frame index
      
      text_5.setAutoDraw(true);
    }
    
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    for (const thisComponent of fail_taskComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function fail_taskRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'fail_task' ---
    for (const thisComponent of fail_taskComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    psychoJS.experiment.addData('fail_task.stopped', globalClock.getTime());
    // the Routine "fail_task" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var _instruct_resp_timing_allKeys;
var instructions_timingComponents;
function instructions_timingRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'instructions_timing' ---
    t = 0;
    instructions_timingClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    instruct_resp_timing.keys = undefined;
    instruct_resp_timing.rt = undefined;
    _instruct_resp_timing_allKeys = [];
    // keep track of which components have finished
    instructions_timingComponents = [];
    instructions_timingComponents.push(instruct_timing_image);
    instructions_timingComponents.push(instruct_resp_timing);
    
    for (const thisComponent of instructions_timingComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function instructions_timingRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'instructions_timing' ---
    // get current time
    t = instructions_timingClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *instruct_timing_image* updates
    if (t >= 0.0 && instruct_timing_image.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      instruct_timing_image.tStart = t;  // (not accounting for frame time here)
      instruct_timing_image.frameNStart = frameN;  // exact frame index
      
      instruct_timing_image.setAutoDraw(true);
    }
    
    
    // *instruct_resp_timing* updates
    if (t >= 0.0 && instruct_resp_timing.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      instruct_resp_timing.tStart = t;  // (not accounting for frame time here)
      instruct_resp_timing.frameNStart = frameN;  // exact frame index
      
      // keyboard checking is just starting
      psychoJS.window.callOnFlip(function() { instruct_resp_timing.clock.reset(); });  // t=0 on next screen flip
      psychoJS.window.callOnFlip(function() { instruct_resp_timing.start(); }); // start on screen flip
      psychoJS.window.callOnFlip(function() { instruct_resp_timing.clearEvents(); });
    }
    
    if (instruct_resp_timing.status === PsychoJS.Status.STARTED) {
      let theseKeys = instruct_resp_timing.getKeys({keyList: ['space', '6'], waitRelease: false});
      _instruct_resp_timing_allKeys = _instruct_resp_timing_allKeys.concat(theseKeys);
      if (_instruct_resp_timing_allKeys.length > 0) {
        instruct_resp_timing.keys = _instruct_resp_timing_allKeys[_instruct_resp_timing_allKeys.length - 1].name;  // just the last key pressed
        instruct_resp_timing.rt = _instruct_resp_timing_allKeys[_instruct_resp_timing_allKeys.length - 1].rt;
        instruct_resp_timing.duration = _instruct_resp_timing_allKeys[_instruct_resp_timing_allKeys.length - 1].duration;
        // a response ends the routine
        continueRoutine = false;
      }
    }
    
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    for (const thisComponent of instructions_timingComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


var nReps_timing_demo;
function instructions_timingRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'instructions_timing' ---
    for (const thisComponent of instructions_timingComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    instruct_resp_timing.stop();
    // Run 'End Routine' code from timing_code
    nReps_timing_demo = 99;
    if ((instruct_resp_timing.keys === "6")) {
        nReps_timing = 0;
        nReps_timing_demo = 0;
    }
    
    // the Routine "instructions_timing" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var _timing_demo_key_allKeys;
var timing_demoComponents;
function timing_demoRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'timing_demo' ---
    t = 0;
    timing_demoClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    timing_demo_key.keys = undefined;
    timing_demo_key.rt = undefined;
    _timing_demo_key_allKeys = [];
    // keep track of which components have finished
    timing_demoComponents = [];
    timing_demoComponents.push(timing_demo_movie);
    timing_demoComponents.push(timing_demo_key);
    
    for (const thisComponent of timing_demoComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function timing_demoRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'timing_demo' ---
    // get current time
    t = timing_demoClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *timing_demo_movie* updates
    if (t >= 0.0 && timing_demo_movie.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      timing_demo_movie.tStart = t;  // (not accounting for frame time here)
      timing_demo_movie.frameNStart = frameN;  // exact frame index
      
      timing_demo_movie.setAutoDraw(true);
      timing_demo_movie.play();
    }
    
    
    // *timing_demo_key* updates
    if (t >= 6.5 && timing_demo_key.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      timing_demo_key.tStart = t;  // (not accounting for frame time here)
      timing_demo_key.frameNStart = frameN;  // exact frame index
      
      // keyboard checking is just starting
      timing_demo_key.clock.reset();
      timing_demo_key.start();
      timing_demo_key.clearEvents();
    }
    
    if (timing_demo_key.status === PsychoJS.Status.STARTED) {
      let theseKeys = timing_demo_key.getKeys({keyList: ['r', 'space'], waitRelease: false});
      _timing_demo_key_allKeys = _timing_demo_key_allKeys.concat(theseKeys);
      if (_timing_demo_key_allKeys.length > 0) {
        timing_demo_key.keys = _timing_demo_key_allKeys[_timing_demo_key_allKeys.length - 1].name;  // just the last key pressed
        timing_demo_key.rt = _timing_demo_key_allKeys[_timing_demo_key_allKeys.length - 1].rt;
        timing_demo_key.duration = _timing_demo_key_allKeys[_timing_demo_key_allKeys.length - 1].duration;
        // a response ends the routine
        continueRoutine = false;
      }
    }
    
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    for (const thisComponent of timing_demoComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function timing_demoRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'timing_demo' ---
    for (const thisComponent of timing_demoComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    timing_demo_movie.stop();  // ensure movie has stopped at end of Routine
    timing_demo_key.stop();
    // Run 'End Routine' code from timing_demo_code
    if ((timing_demo_key.keys === "space")) {
        timing_demo_loop.finished = 1;
    }
    
    // the Routine "timing_demo" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var _trial_resp_timing_allKeys;
var timingComponents;
function timingRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'timing' ---
    t = 0;
    timingClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    psychoJS.experiment.addData('timing.started', globalClock.getTime());
    //check full screen (js only)
    fullscreen = psychoJS.window._windowAlreadyInFullScreen
    psychoJS.experiment.addData('fullscreen', fullscreen)
    
    if ((! fullscreen)) {
        throw new Error('You have exited fullscreen mode. The task will terminate. Please return your submission.');
    }
    
    trial_resp_timing.keys = undefined;
    trial_resp_timing.rt = undefined;
    _trial_resp_timing_allKeys = [];
    // keep track of which components have finished
    timingComponents = [];
    timingComponents.push(trial_resp_timing);
    timingComponents.push(fixation_timing);
    timingComponents.push(dot1_timing);
    timingComponents.push(dot2_timing);
    timingComponents.push(dot3_timing);
    timingComponents.push(dot4_timing);
    timingComponents.push(fixation_timing_2);
    timingComponents.push(dot1_timing_2);
    timingComponents.push(dot2_timing_2);
    timingComponents.push(dot3_timing_2);
    timingComponents.push(dot4_timing_2);
    
    for (const thisComponent of timingComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function timingRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'timing' ---
    // get current time
    t = timingClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *trial_resp_timing* updates
    if (t >= 0 && trial_resp_timing.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      trial_resp_timing.tStart = t;  // (not accounting for frame time here)
      trial_resp_timing.frameNStart = frameN;  // exact frame index
      
      // keyboard checking is just starting
      trial_resp_timing.clock.reset();
      trial_resp_timing.start();
      trial_resp_timing.clearEvents();
    }
    
    if (trial_resp_timing.status === PsychoJS.Status.STARTED) {
      let theseKeys = trial_resp_timing.getKeys({keyList: ['p', 'w', 'esc'], waitRelease: false});
      _trial_resp_timing_allKeys = _trial_resp_timing_allKeys.concat(theseKeys);
      if (_trial_resp_timing_allKeys.length > 0) {
        trial_resp_timing.keys = _trial_resp_timing_allKeys[0].name;  // just the first key pressed
        trial_resp_timing.rt = _trial_resp_timing_allKeys[0].rt;
        trial_resp_timing.duration = _trial_resp_timing_allKeys[0].duration;
        // a response ends the routine
        continueRoutine = false;
      }
    }
    
    
    // *fixation_timing* updates
    if (t >= 0 && fixation_timing.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      fixation_timing.tStart = t;  // (not accounting for frame time here)
      fixation_timing.frameNStart = frameN;  // exact frame index
      
      fixation_timing.setAutoDraw(true);
    }
    
    
    // *dot1_timing* updates
    if (t >= 0.5 && dot1_timing.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      dot1_timing.tStart = t;  // (not accounting for frame time here)
      dot1_timing.frameNStart = frameN;  // exact frame index
      
      dot1_timing.setAutoDraw(true);
    }
    
    
    // *dot2_timing* updates
    if (t >= 1 && dot2_timing.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      dot2_timing.tStart = t;  // (not accounting for frame time here)
      dot2_timing.frameNStart = frameN;  // exact frame index
      
      dot2_timing.setAutoDraw(true);
    }
    
    
    // *dot3_timing* updates
    if (t >= 1.5 && dot3_timing.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      dot3_timing.tStart = t;  // (not accounting for frame time here)
      dot3_timing.frameNStart = frameN;  // exact frame index
      
      dot3_timing.setAutoDraw(true);
    }
    
    
    // *dot4_timing* updates
    if (t >= 2 && dot4_timing.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      dot4_timing.tStart = t;  // (not accounting for frame time here)
      dot4_timing.frameNStart = frameN;  // exact frame index
      
      dot4_timing.setAutoDraw(true);
    }
    
    
    // *fixation_timing_2* updates
    if (t >= 0 && fixation_timing_2.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      fixation_timing_2.tStart = t;  // (not accounting for frame time here)
      fixation_timing_2.frameNStart = frameN;  // exact frame index
      
      fixation_timing_2.setAutoDraw(true);
    }
    
    
    // *dot1_timing_2* updates
    if (t >= 0.5 && dot1_timing_2.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      dot1_timing_2.tStart = t;  // (not accounting for frame time here)
      dot1_timing_2.frameNStart = frameN;  // exact frame index
      
      dot1_timing_2.setAutoDraw(true);
    }
    
    
    // *dot2_timing_2* updates
    if (t >= 1 && dot2_timing_2.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      dot2_timing_2.tStart = t;  // (not accounting for frame time here)
      dot2_timing_2.frameNStart = frameN;  // exact frame index
      
      dot2_timing_2.setAutoDraw(true);
    }
    
    
    // *dot3_timing_2* updates
    if (t >= 1.5 && dot3_timing_2.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      dot3_timing_2.tStart = t;  // (not accounting for frame time here)
      dot3_timing_2.frameNStart = frameN;  // exact frame index
      
      dot3_timing_2.setAutoDraw(true);
    }
    
    
    // *dot4_timing_2* updates
    if (t >= 2 && dot4_timing_2.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      dot4_timing_2.tStart = t;  // (not accounting for frame time here)
      dot4_timing_2.frameNStart = frameN;  // exact frame index
      
      dot4_timing_2.setAutoDraw(true);
    }
    
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    for (const thisComponent of timingComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


var rt;
function timingRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'timing' ---
    for (const thisComponent of timingComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    psychoJS.experiment.addData('timing.stopped', globalClock.getTime());
    // Run 'End Routine' code from trial_code_timing
    rt = trial_resp_timing.rt;
    if ((rt < 1.9)) {
        feedback_msg = "Too fast!";
        acc_timing.push(0);
    } else {
        if ((rt > 2.1)) {
            feedback_msg = "Too slow!";
            acc_timing.push(0);
        } else {
            if (((rt >= 1.9) && (rt <= 2.1))) {
                feedback_msg = "Perfect timing!";
                acc_timing.push(1);
            } else {
                feedback_msg = "No response.";
                acc_timing.push(0);
            }
        }
    }
    console.log("len(acc_timing)", acc_timing.length);
    if ((acc_timing.length >= 30)) {
        acc_timing_last20 = (util.sum(acc_timing.slice((- 20))) / acc_timing.slice((- 20)).length);
        console.log("acc_timing_last20", acc_timing_last20);
        if ((acc_timing_last20 >= 0.7)) {
            trial_train_timing.finished = true;
        }
    }
    if ((acc_timing.length > 60)) {
        terminate_task = true;
    }
    
    // update the trial handler
    if (currentLoop instanceof MultiStairHandler) {
      currentLoop.addResponse(trial_resp_timing.corr, level);
    }
    psychoJS.experiment.addData('trial_resp_timing.keys', trial_resp_timing.keys);
    if (typeof trial_resp_timing.keys !== 'undefined') {  // we had a response
        psychoJS.experiment.addData('trial_resp_timing.rt', trial_resp_timing.rt);
        psychoJS.experiment.addData('trial_resp_timing.duration', trial_resp_timing.duration);
        routineTimer.reset();
        }
    
    trial_resp_timing.stop();
    // the Routine "timing" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var feedback_timingComponents;
function feedback_timingRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'feedback_timing' ---
    t = 0;
    feedback_timingClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    routineTimer.add(0.400000);
    // update component parameters for each repeat
    psychoJS.experiment.addData('feedback_timing.started', globalClock.getTime());
    feedback_text_timing.setText(feedback_msg);
    // keep track of which components have finished
    feedback_timingComponents = [];
    feedback_timingComponents.push(feedback_text_timing);
    
    for (const thisComponent of feedback_timingComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function feedback_timingRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'feedback_timing' ---
    // get current time
    t = feedback_timingClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *feedback_text_timing* updates
    if (t >= 0 && feedback_text_timing.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      feedback_text_timing.tStart = t;  // (not accounting for frame time here)
      feedback_text_timing.frameNStart = frameN;  // exact frame index
      
      feedback_text_timing.setAutoDraw(true);
    }
    
    frameRemains = 0 + 0.4 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (feedback_text_timing.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      feedback_text_timing.setAutoDraw(false);
    }
    
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    for (const thisComponent of feedback_timingComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
    // refresh the screen if continuing
    if (continueRoutine && routineTimer.getTime() > 0) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function feedback_timingRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'feedback_timing' ---
    for (const thisComponent of feedback_timingComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    psychoJS.experiment.addData('feedback_timing.stopped', globalClock.getTime());
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var _instruct_resp_allKeys;
var instructionsComponents;
function instructionsRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'instructions' ---
    t = 0;
    instructionsClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    instruct_resp.keys = undefined;
    instruct_resp.rt = undefined;
    _instruct_resp_allKeys = [];
    // keep track of which components have finished
    instructionsComponents = [];
    instructionsComponents.push(instruct_image);
    instructionsComponents.push(instruct_resp);
    
    for (const thisComponent of instructionsComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function instructionsRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'instructions' ---
    // get current time
    t = instructionsClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *instruct_image* updates
    if (t >= 0.0 && instruct_image.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      instruct_image.tStart = t;  // (not accounting for frame time here)
      instruct_image.frameNStart = frameN;  // exact frame index
      
      instruct_image.setAutoDraw(true);
    }
    
    
    // *instruct_resp* updates
    if (t >= 0.0 && instruct_resp.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      instruct_resp.tStart = t;  // (not accounting for frame time here)
      instruct_resp.frameNStart = frameN;  // exact frame index
      
      // keyboard checking is just starting
      psychoJS.window.callOnFlip(function() { instruct_resp.clock.reset(); });  // t=0 on next screen flip
      psychoJS.window.callOnFlip(function() { instruct_resp.start(); }); // start on screen flip
      psychoJS.window.callOnFlip(function() { instruct_resp.clearEvents(); });
    }
    
    if (instruct_resp.status === PsychoJS.Status.STARTED) {
      let theseKeys = instruct_resp.getKeys({keyList: ['space'], waitRelease: false});
      _instruct_resp_allKeys = _instruct_resp_allKeys.concat(theseKeys);
      if (_instruct_resp_allKeys.length > 0) {
        instruct_resp.keys = _instruct_resp_allKeys[_instruct_resp_allKeys.length - 1].name;  // just the last key pressed
        instruct_resp.rt = _instruct_resp_allKeys[_instruct_resp_allKeys.length - 1].rt;
        instruct_resp.duration = _instruct_resp_allKeys[_instruct_resp_allKeys.length - 1].duration;
        // a response ends the routine
        continueRoutine = false;
      }
    }
    
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    for (const thisComponent of instructionsComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function instructionsRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'instructions' ---
    for (const thisComponent of instructionsComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    instruct_resp.stop();
    // the Routine "instructions" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var _exp_demo_key_allKeys;
var exp_demoComponents;
function exp_demoRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'exp_demo' ---
    t = 0;
    exp_demoClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    exp_demo_key.keys = undefined;
    exp_demo_key.rt = undefined;
    _exp_demo_key_allKeys = [];
    // keep track of which components have finished
    exp_demoComponents = [];
    exp_demoComponents.push(exp_demo_movie);
    exp_demoComponents.push(exp_demo_key);
    
    for (const thisComponent of exp_demoComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function exp_demoRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'exp_demo' ---
    // get current time
    t = exp_demoClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *exp_demo_movie* updates
    if (t >= 0.0 && exp_demo_movie.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      exp_demo_movie.tStart = t;  // (not accounting for frame time here)
      exp_demo_movie.frameNStart = frameN;  // exact frame index
      
      exp_demo_movie.setAutoDraw(true);
      exp_demo_movie.play();
    }
    
    
    // *exp_demo_key* updates
    if (t >= 6.5 && exp_demo_key.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      exp_demo_key.tStart = t;  // (not accounting for frame time here)
      exp_demo_key.frameNStart = frameN;  // exact frame index
      
      // keyboard checking is just starting
      psychoJS.window.callOnFlip(function() { exp_demo_key.clock.reset(); });  // t=0 on next screen flip
      psychoJS.window.callOnFlip(function() { exp_demo_key.start(); }); // start on screen flip
      psychoJS.window.callOnFlip(function() { exp_demo_key.clearEvents(); });
    }
    
    if (exp_demo_key.status === PsychoJS.Status.STARTED) {
      let theseKeys = exp_demo_key.getKeys({keyList: ['r', 'space'], waitRelease: false});
      _exp_demo_key_allKeys = _exp_demo_key_allKeys.concat(theseKeys);
      if (_exp_demo_key_allKeys.length > 0) {
        exp_demo_key.keys = _exp_demo_key_allKeys[_exp_demo_key_allKeys.length - 1].name;  // just the last key pressed
        exp_demo_key.rt = _exp_demo_key_allKeys[_exp_demo_key_allKeys.length - 1].rt;
        exp_demo_key.duration = _exp_demo_key_allKeys[_exp_demo_key_allKeys.length - 1].duration;
        // a response ends the routine
        continueRoutine = false;
      }
    }
    
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    for (const thisComponent of exp_demoComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function exp_demoRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'exp_demo' ---
    for (const thisComponent of exp_demoComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    exp_demo_movie.stop();  // ensure movie has stopped at end of Routine
    exp_demo_key.stop();
    // Run 'End Routine' code from exp_demo_code
    if ((exp_demo_key.keys === "space")) {
        exp_demo_loop.finished = 1;
    }
    
    // the Routine "exp_demo" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var _forcedRT_resp_allKeys;
var trialComponents;
function trialRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'trial' ---
    t = 0;
    trialClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    psychoJS.experiment.addData('trial.started', globalClock.getTime());
    //check full screen (js only)
    fullscreen = psychoJS.window._windowAlreadyInFullScreen
    psychoJS.experiment.addData('fullscreen', fullscreen)
    
    if ((! fullscreen)) {
        throw new Error('You have exited fullscreen mode. The task will terminate. Please return your submission.');
    }
    
    // Run 'Begin Routine' code from trial_code
    util.shuffle(possible_target_onset_timings);
    target_onset = (possible_target_onset_timings[0] / 1000);
    
    forcedRT_resp.keys = undefined;
    forcedRT_resp.rt = undefined;
    _forcedRT_resp_allKeys = [];
    target.setImage(tar_arrow);
    left1.setImage(dis_arrow);
    left2.setImage(dis_arrow);
    right1.setImage(dis_arrow);
    right2.setImage(dis_arrow);
    // keep track of which components have finished
    trialComponents = [];
    trialComponents.push(forcedRT_resp);
    trialComponents.push(fixation);
    trialComponents.push(dot1);
    trialComponents.push(dot2);
    trialComponents.push(dot3);
    trialComponents.push(dot4);
    trialComponents.push(fixation_2);
    trialComponents.push(dot1_2);
    trialComponents.push(dot2_2);
    trialComponents.push(dot3_2);
    trialComponents.push(dot4_2);
    trialComponents.push(target);
    trialComponents.push(left1);
    trialComponents.push(left2);
    trialComponents.push(right1);
    trialComponents.push(right2);
    
    for (const thisComponent of trialComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function trialRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'trial' ---
    // get current time
    t = trialClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *forcedRT_resp* updates
    if (t >= 0 && forcedRT_resp.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      forcedRT_resp.tStart = t;  // (not accounting for frame time here)
      forcedRT_resp.frameNStart = frameN;  // exact frame index
      
      // keyboard checking is just starting
      forcedRT_resp.clock.reset();
      forcedRT_resp.start();
      forcedRT_resp.clearEvents();
    }
    
    if (forcedRT_resp.status === PsychoJS.Status.STARTED) {
      let theseKeys = forcedRT_resp.getKeys({keyList: ['p', 'w'], waitRelease: false});
      _forcedRT_resp_allKeys = _forcedRT_resp_allKeys.concat(theseKeys);
      if (_forcedRT_resp_allKeys.length > 0) {
        forcedRT_resp.keys = _forcedRT_resp_allKeys[0].name;  // just the first key pressed
        forcedRT_resp.rt = _forcedRT_resp_allKeys[0].rt;
        forcedRT_resp.duration = _forcedRT_resp_allKeys[0].duration;
        // was this correct?
        if (forcedRT_resp.keys == target_resp) {
            forcedRT_resp.corr = 1;
        } else {
            forcedRT_resp.corr = 0;
        }
        // a response ends the routine
        continueRoutine = false;
      }
    }
    
    
    // *fixation* updates
    if (t >= 0 && fixation.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      fixation.tStart = t;  // (not accounting for frame time here)
      fixation.frameNStart = frameN;  // exact frame index
      
      fixation.setAutoDraw(true);
    }
    
    
    // *dot1* updates
    if (t >= 0.5 && dot1.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      dot1.tStart = t;  // (not accounting for frame time here)
      dot1.frameNStart = frameN;  // exact frame index
      
      dot1.setAutoDraw(true);
    }
    
    
    // *dot2* updates
    if (t >= 1 && dot2.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      dot2.tStart = t;  // (not accounting for frame time here)
      dot2.frameNStart = frameN;  // exact frame index
      
      dot2.setAutoDraw(true);
    }
    
    
    // *dot3* updates
    if (t >= 1.5 && dot3.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      dot3.tStart = t;  // (not accounting for frame time here)
      dot3.frameNStart = frameN;  // exact frame index
      
      dot3.setAutoDraw(true);
    }
    
    
    // *dot4* updates
    if (t >= 2 && dot4.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      dot4.tStart = t;  // (not accounting for frame time here)
      dot4.frameNStart = frameN;  // exact frame index
      
      dot4.setAutoDraw(true);
    }
    
    
    // *fixation_2* updates
    if (t >= 0 && fixation_2.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      fixation_2.tStart = t;  // (not accounting for frame time here)
      fixation_2.frameNStart = frameN;  // exact frame index
      
      fixation_2.setAutoDraw(true);
    }
    
    
    // *dot1_2* updates
    if (t >= 0.5 && dot1_2.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      dot1_2.tStart = t;  // (not accounting for frame time here)
      dot1_2.frameNStart = frameN;  // exact frame index
      
      dot1_2.setAutoDraw(true);
    }
    
    
    // *dot2_2* updates
    if (t >= 1 && dot2_2.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      dot2_2.tStart = t;  // (not accounting for frame time here)
      dot2_2.frameNStart = frameN;  // exact frame index
      
      dot2_2.setAutoDraw(true);
    }
    
    
    // *dot3_2* updates
    if (t >= 1.5 && dot3_2.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      dot3_2.tStart = t;  // (not accounting for frame time here)
      dot3_2.frameNStart = frameN;  // exact frame index
      
      dot3_2.setAutoDraw(true);
    }
    
    
    // *dot4_2* updates
    if (t >= 2 && dot4_2.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      dot4_2.tStart = t;  // (not accounting for frame time here)
      dot4_2.frameNStart = frameN;  // exact frame index
      
      dot4_2.setAutoDraw(true);
    }
    
    
    // *target* updates
    if (t >= target_onset && target.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      target.tStart = t;  // (not accounting for frame time here)
      target.frameNStart = frameN;  // exact frame index
      
      target.setAutoDraw(true);
    }
    
    
    // *left1* updates
    if (t >= target_onset && left1.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      left1.tStart = t;  // (not accounting for frame time here)
      left1.frameNStart = frameN;  // exact frame index
      
      left1.setAutoDraw(true);
    }
    
    
    // *left2* updates
    if (t >= target_onset && left2.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      left2.tStart = t;  // (not accounting for frame time here)
      left2.frameNStart = frameN;  // exact frame index
      
      left2.setAutoDraw(true);
    }
    
    
    // *right1* updates
    if (t >= target_onset && right1.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      right1.tStart = t;  // (not accounting for frame time here)
      right1.frameNStart = frameN;  // exact frame index
      
      right1.setAutoDraw(true);
    }
    
    
    // *right2* updates
    if (t >= target_onset && right2.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      right2.tStart = t;  // (not accounting for frame time here)
      right2.frameNStart = frameN;  // exact frame index
      
      right2.setAutoDraw(true);
    }
    
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    for (const thisComponent of trialComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


var ontime;
var pt;
function trialRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'trial' ---
    for (const thisComponent of trialComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    psychoJS.experiment.addData('trial.stopped', globalClock.getTime());
    // Run 'End Routine' code from trial_code
    rt = forcedRT_resp.rt;
    ontime = "NA";
    if ((rt < 1.9)) {
        feedback_msg = "Too fast!";
        ontime = "Fast";
    } else {
        if ((rt > 2.1)) {
            feedback_msg = "Too slow!";
            ontime = "Slow";
        } else {
            if (((rt >= 1.9) && (rt <= 2.1))) {
                feedback_msg = "Perfect timing!";
                ontime = "Ontime";
            } else {
                feedback_msg = "No response.";
            }
        }
    }
    pt = ((rt - target_onset) * 1000);
    console.log("target_onset", target_onset);
    console.log("pt", pt);
    psychoJS.experiment.addData("block_id", block_id);
    psychoJS.experiment.addData("ontime", ontime);
    psychoJS.experiment.addData("target_onset", target_onset);
    psychoJS.experiment.addData("pt", pt);
    
    // was no response the correct answer?!
    if (forcedRT_resp.keys === undefined) {
      if (['None','none',undefined].includes(target_resp)) {
         forcedRT_resp.corr = 1;  // correct non-response
      } else {
         forcedRT_resp.corr = 0;  // failed to respond (incorrectly)
      }
    }
    // store data for current loop
    // update the trial handler
    if (currentLoop instanceof MultiStairHandler) {
      currentLoop.addResponse(forcedRT_resp.corr, level);
    }
    psychoJS.experiment.addData('forcedRT_resp.keys', forcedRT_resp.keys);
    psychoJS.experiment.addData('forcedRT_resp.corr', forcedRT_resp.corr);
    if (typeof forcedRT_resp.keys !== 'undefined') {  // we had a response
        psychoJS.experiment.addData('forcedRT_resp.rt', forcedRT_resp.rt);
        psychoJS.experiment.addData('forcedRT_resp.duration', forcedRT_resp.duration);
        routineTimer.reset();
        }
    
    forcedRT_resp.stop();
    // the Routine "trial" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var feedback_testComponents;
function feedback_testRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'feedback_test' ---
    t = 0;
    feedback_testClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    routineTimer.add(1.000000);
    // update component parameters for each repeat
    psychoJS.experiment.addData('feedback_test.started', globalClock.getTime());
    feedback_test_text.setText(feedback_msg);
    // keep track of which components have finished
    feedback_testComponents = [];
    feedback_testComponents.push(feedback_test_text);
    feedback_testComponents.push(wait_text);
    
    for (const thisComponent of feedback_testComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function feedback_testRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'feedback_test' ---
    // get current time
    t = feedback_testClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *feedback_test_text* updates
    if (t >= 0 && feedback_test_text.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      feedback_test_text.tStart = t;  // (not accounting for frame time here)
      feedback_test_text.frameNStart = frameN;  // exact frame index
      
      feedback_test_text.setAutoDraw(true);
    }
    
    frameRemains = 0.4  - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if ((feedback_test_text.status === PsychoJS.Status.STARTED || feedback_test_text.status === PsychoJS.Status.FINISHED) && t >= frameRemains) {
      feedback_test_text.setAutoDraw(false);
    }
    
    
    // *wait_text* updates
    if (t >= 0.4 && wait_text.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      wait_text.tStart = t;  // (not accounting for frame time here)
      wait_text.frameNStart = frameN;  // exact frame index
      
      wait_text.setAutoDraw(true);
    }
    
    frameRemains = 0.4 + 0.6 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (wait_text.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      wait_text.setAutoDraw(false);
    }
    
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    for (const thisComponent of feedback_testComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
    // refresh the screen if continuing
    if (continueRoutine && routineTimer.getTime() > 0) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function feedback_testRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'feedback_test' ---
    for (const thisComponent of feedback_testComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    psychoJS.experiment.addData('feedback_test.stopped', globalClock.getTime());
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var block_msg;
var _rest_key_allKeys;
var end_blockComponents;
function end_blockRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'end_block' ---
    t = 0;
    end_blockClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    // Run 'Begin Routine' code from rest_code
    block_msg = ((("You have completed block " + block_id.toString()) + " of ") + nBlocks.toString());
    if ((block_id !== nBlocks)) {
        block_msg = (block_msg + "\n\nYour task will be the same in the next block.");
    }
    
    block_text.setText(block_msg);
    rest_key.keys = undefined;
    rest_key.rt = undefined;
    _rest_key_allKeys = [];
    // keep track of which components have finished
    end_blockComponents = [];
    end_blockComponents.push(block_text);
    end_blockComponents.push(rest_text);
    end_blockComponents.push(rest_key);
    
    for (const thisComponent of end_blockComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function end_blockRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'end_block' ---
    // get current time
    t = end_blockClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *block_text* updates
    if (t >= 0 && block_text.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      block_text.tStart = t;  // (not accounting for frame time here)
      block_text.frameNStart = frameN;  // exact frame index
      
      block_text.setAutoDraw(true);
    }
    
    
    // *rest_text* updates
    if (t >= 0 && rest_text.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      rest_text.tStart = t;  // (not accounting for frame time here)
      rest_text.frameNStart = frameN;  // exact frame index
      
      rest_text.setAutoDraw(true);
    }
    
    
    // *rest_key* updates
    if (t >= 0.0 && rest_key.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      rest_key.tStart = t;  // (not accounting for frame time here)
      rest_key.frameNStart = frameN;  // exact frame index
      
      // keyboard checking is just starting
      psychoJS.window.callOnFlip(function() { rest_key.clock.reset(); });  // t=0 on next screen flip
      psychoJS.window.callOnFlip(function() { rest_key.start(); }); // start on screen flip
      psychoJS.window.callOnFlip(function() { rest_key.clearEvents(); });
    }
    
    if (rest_key.status === PsychoJS.Status.STARTED) {
      let theseKeys = rest_key.getKeys({keyList: ['space'], waitRelease: false});
      _rest_key_allKeys = _rest_key_allKeys.concat(theseKeys);
      if (_rest_key_allKeys.length > 0) {
        rest_key.keys = _rest_key_allKeys[_rest_key_allKeys.length - 1].name;  // just the last key pressed
        rest_key.rt = _rest_key_allKeys[_rest_key_allKeys.length - 1].rt;
        rest_key.duration = _rest_key_allKeys[_rest_key_allKeys.length - 1].duration;
        // a response ends the routine
        continueRoutine = false;
      }
    }
    
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    for (const thisComponent of end_blockComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function end_blockRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'end_block' ---
    for (const thisComponent of end_blockComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    // Run 'End Routine' code from rest_code
    block_id = (block_id + 1);
    
    rest_key.stop();
    // the Routine "end_block" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var _exit_resp_allKeys;
var end_studyComponents;
function end_studyRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'end_study' ---
    t = 0;
    end_studyClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    exit_resp.keys = undefined;
    exit_resp.rt = undefined;
    _exit_resp_allKeys = [];
    // keep track of which components have finished
    end_studyComponents = [];
    end_studyComponents.push(study_over);
    end_studyComponents.push(exit_resp);
    
    for (const thisComponent of end_studyComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function end_studyRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'end_study' ---
    // get current time
    t = end_studyClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *study_over* updates
    if (t >= 0.0 && study_over.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      study_over.tStart = t;  // (not accounting for frame time here)
      study_over.frameNStart = frameN;  // exact frame index
      
      study_over.setAutoDraw(true);
    }
    
    
    // *exit_resp* updates
    if (t >= 0.0 && exit_resp.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      exit_resp.tStart = t;  // (not accounting for frame time here)
      exit_resp.frameNStart = frameN;  // exact frame index
      
      // keyboard checking is just starting
      psychoJS.window.callOnFlip(function() { exit_resp.clock.reset(); });  // t=0 on next screen flip
      psychoJS.window.callOnFlip(function() { exit_resp.start(); }); // start on screen flip
      psychoJS.window.callOnFlip(function() { exit_resp.clearEvents(); });
    }
    
    if (exit_resp.status === PsychoJS.Status.STARTED) {
      let theseKeys = exit_resp.getKeys({keyList: ['space'], waitRelease: false});
      _exit_resp_allKeys = _exit_resp_allKeys.concat(theseKeys);
      if (_exit_resp_allKeys.length > 0) {
        exit_resp.keys = _exit_resp_allKeys[_exit_resp_allKeys.length - 1].name;  // just the last key pressed
        exit_resp.rt = _exit_resp_allKeys[_exit_resp_allKeys.length - 1].rt;
        exit_resp.duration = _exit_resp_allKeys[_exit_resp_allKeys.length - 1].duration;
        // a response ends the routine
        continueRoutine = false;
      }
    }
    
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    for (const thisComponent of end_studyComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function end_studyRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'end_study' ---
    for (const thisComponent of end_studyComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    exit_resp.stop();
    // the Routine "end_study" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


function importConditions(currentLoop) {
  return async function () {
    psychoJS.importAttributes(currentLoop.getCurrentTrial());
    return Scheduler.Event.NEXT;
    };
}


async function quitPsychoJS(message, isCompleted) {
  // Check for and save orphaned data
  if (psychoJS.experiment.isEntryEmpty()) {
    psychoJS.experiment.nextEntry();
  }
  document.body.style.cursor='auto';
  psychoJS.window.close();
  psychoJS.quit({message: message, isCompleted: isCompleted});
  
  return Scheduler.Event.QUIT;
}
