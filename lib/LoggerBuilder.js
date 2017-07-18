const BunyanLogger = require('./BunyanLogger');

class LoggerBuilder {
  static create(Logger) {
    return new LoggerBuilder(Logger);
  }

  constructor(Logger) {
    this.opts = {
      src: true,
      streams: [],
    };

    this.Logger = Logger || BunyanLogger;
  }

  name(component) {
    this.opts.name = component;
    return this;
  }

  addStream(stream) {
    this.opts.streams.push(stream);

    return this;
  }

  addStreams(streams) {
    streams.forEach(s => this.addStream(s));
    return this;
  }

  addSerializer(name, serializer) {
    this.opts.serializers = Object.assign(this.opts.serializers || {}, {
      [name]: serializer,
    });

    return this;
  }

  build() {
    return new this.Logger(this.opts);
  }
}

module.exports = LoggerBuilder;