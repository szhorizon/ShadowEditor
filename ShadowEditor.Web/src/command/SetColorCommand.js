import Command from './Command';

/**
 * 设置颜色命令
 * @author dforrer / https://github.com/dforrer
 * Developed as part of a project at University of Applied Sciences and Arts Northwestern Switzerland (www.fhnw.ch)
 * @param object THREE.Object3D
 * @param attributeName string
 * @param newValue integer representing a hex color value
 * @constructor
 */
function SetColorCommand(object, attributeName, newValue) {
	Command.call(this);

	this.type = 'SetColorCommand';
	this.name = L_SET + ' ' + attributeName;
	this.updatable = true;

	this.object = object;
	this.attributeName = attributeName;
	this.oldValue = (object !== undefined) ? this.object[this.attributeName].getHex() : undefined;
	this.newValue = newValue;
};

SetColorCommand.prototype = Object.create(Command.prototype);

Object.assign(SetColorCommand.prototype, {
	constructor: SetColorCommand,

	execute: function () {
		this.object[this.attributeName].setHex(this.newValue);
		this.editor.app.call('objectChanged', this, this.object);
	},

	undo: function () {
		this.object[this.attributeName].setHex(this.oldValue);
		this.editor.app.call('objectChanged', this, this.object);
	},

	update: function (cmd) {
		this.newValue = cmd.newValue;
	},

	toJSON: function () {
		var output = Command.prototype.toJSON.call(this);

		output.objectUuid = this.object.uuid;
		output.attributeName = this.attributeName;
		output.oldValue = this.oldValue;
		output.newValue = this.newValue;

		return output;
	},

	fromJSON: function (json) {
		Command.prototype.fromJSON.call(this, json);

		this.object = this.editor.objectByUuid(json.objectUuid);
		this.attributeName = json.attributeName;
		this.oldValue = json.oldValue;
		this.newValue = json.newValue;
	}
});

export default SetColorCommand;