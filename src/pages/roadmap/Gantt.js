import React, { Component } from 'react';
import { gantt } from 'dhtmlx-gantt';
import 'dhtmlx-gantt/codebase/dhtmlxgantt.css';
import './Gantt.css';
import { Paper } from '@mui/material';

// var taskId = null;

// function getForm() {
//   return document.getElementById("my-form");
// };

// function save() {
//   var task = gantt.getTask(taskId);

//   task.text = getForm().querySelector("[name='description']").value;

//   if (task.$new) {
//     delete task.$new;
//     gantt.addTask(task, task.parent);
//   } else {
//     gantt.updateTask(task.id);
//   }

//   gantt.hideLightbox();
// }

// function cancel() {
//   var task = gantt.getTask(taskId);

//   if (task.$new)
//     gantt.deleteTask(task.id);
//   gantt.hideLightbox();
// }

// function remove() {
//   gantt.deleteTask(taskId);
//   gantt.hideLightbox();
// }

export default class Gantt extends Component {
  // instance of gantt.dataProcessor
  dataProcessor = null;


  initZoom() {
    gantt.ext.zoom.init({
      levels: [
        {
          name: 'Hours',
          scale_height: 60,
          min_column_width: 30,
          scales: [
            { unit: 'day', step: 1, format: '%d %M' },
            { unit: 'hour', step: 1, format: '%H' },
          ],
        },
        {
          name: 'Days',
          scale_height: 60,
          min_column_width: 70,
          scales: [
            { unit: 'week', step: 1, format: 'Week #%W' },
            { unit: 'day', step: 1, format: '%d %M' },
          ],
        },
        {
          name: 'Months',
          scale_height: 60,
          min_column_width: 70,
          scales: [
            { unit: 'month', step: 1, format: '%F' },
            { unit: 'week', step: 1, format: '#%W' },
          ],
        },
      ],
    });
  }

  setZoom(value) {
    if (!gantt.ext.zoom.getLevels()) {
      this.initZoom();
    }
    gantt.ext.zoom.setLevel(value);
  }

  initGanttDataProcessor() {
    /**
     * type: "task"|"link"
     * action: "create"|"update"|"delete"
     * item: data object object
     */
    const onDataUpdated = this.props.onDataUpdated;
    this.dataProcessor = gantt.createDataProcessor((type, action, item, id) => {
      return new Promise((resolve, reject) => {
        if (onDataUpdated) {
          onDataUpdated(type, action, item, id);
        }

        // if onDataUpdated changes returns a permanent id of the created item, you can return it from here so dhtmlxGantt could apply it
        // resolve({id: databaseId});
        return resolve();
      });
    });
  }

  shouldComponentUpdate(nextProps) {
    return this.props.zoom !== nextProps.zoom;
  }

  componentDidMount() {
    gantt.config.date_format = '%d-%m-%Y %H:%i';

    var opts = [
      { key: 1, label: 'High' },
      { key: 2, label: 'Normal' },
      { key: 3, label: 'Low' }
    ];

    gantt.config.lightbox.sections = [
      { name: "description", height: 72, map_to: "text", type: "textarea", focus: true },
      { name: "parent", type: "parent", height: 42, allow_root: "true", root_label: "No parent" },
      { name: "priority", height: 42, map_to: "priority", type: "select", options: opts },
      { name: "period", height: 42, map_to: "auto", type: "time" },

    ];
    gantt.locale.labels.section_priority = "Priority";
    gantt.locale.labels.section_period = "Time period";
    gantt.locale.labels.section_parent = "Parent";



    // gantt.showLightbox = function (id) {
    //   taskId = id;
    //   var task = gantt.getTask(id);

    //   var form = getForm();
    //   var input = form.querySelector("[name='description']");
    //   input.focus();
    //   input.value = task.text;

    //   form.style.display = "block";

    //   form.querySelector("[name='save']").onclick = save;
    //   form.querySelector("[name='close']").onclick = cancel;
    //   form.querySelector("[name='delete']").onclick = remove;
    // };

    // gantt.hideLightbox = function () {
    //   getForm().style.display = "";
    //   taskId = null;
    // }

    const { tasks } = this.props;
    gantt.init(this.ganttContainer);
    this.initGanttDataProcessor();
    gantt.parse(tasks);
  }

  componentWillUnmount() {
    if (this.dataProcessor) {
      this.dataProcessor.destructor();
      this.dataProcessor = null;
    }
  }

  render() {
    const { zoom } = this.props;
    this.setZoom(zoom);
    return (
      <Paper
        sx={{ my: 1 }}
        ref={(input) => {
          this.ganttContainer = input;
        }}
        style={{ width: '100%', height: '60vh' }}
      ></Paper>
    );
  }
}
