/**
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @fileoverview Interface for containers of people functionality.
 */


/**
 * Base interface for all containers.
 *
 * @constructor
 * @private
 */
opensocial.Container = function() {
  this.cajaEnabled_ = false;
};


/**
 * The container instance.
 *
 * @type Container
 * @private
 */
opensocial.Container.container_ = null;


/**
 * Set the current container object.
 *
 * @param {opensocial.Container} container The container
 * @private
 */
opensocial.Container.setContainer = function(container) {
  opensocial.Container.container_ = container;
};


/**
 * Get the current container object.
 *
 * @return {opensocial.Container} container The current container
 * @private
 */
opensocial.Container.get = function() {
  return opensocial.Container.container_;
};


/**
 * Gets the current environment for this gadget. You can use the environment to
 * query things like what profile fields and surfaces are supported by this
 * container, what parameters were passed to the current gadget and so forth.
 *
 * @return {opensocial.Environment} The current environment
 *
 * @private
 */
opensocial.Container.prototype.getEnvironment = function() {};


/**
 * Request for the container to make the specified person not a friend.
 *
 * Note: If this is the first activity that has been created for the user and
 * the request is marked as HIGH priority then this call may open a user flow
 * and navigate away from your gadget.
 *
 * @param {Activity} activity The activity to create. The only required field is
 *     title.
 * @param {CreateActivityPriority} priority The priority for this request.
 * @param {Function} opt_callback Function to call once the request has been
 *    processed.
 * @private
 */
opensocial.Container.prototype.requestCreateActivity = function(activity,
    priority, opt_callback) {};


/**
 * Returns whether the current gadget has access to the specified
 * permission.
 *
 * @param {opensocial.Permission | String} permission The permission
 * @return {Boolean} Whether the gadget has access for the permission.
 *
 * @private
 */
opensocial.Container.prototype.hasPermission = function(permission) {};


/**
 * Requests the user grants access to the specified permissions.
 *
 * @param {Array.<opensocial.Permission>} permissions The permissions to request
 *    access to from the viewer
 * @param {String} reason Will be displayed to the user as the reason why these
 *    permissions are needed.
 * @param {Function} opt_callback The function to call once the request has been
 *    processed. This callback will either be called or the gadget will be
 *    reloaded from scratch
 *
 * @private
 */
opensocial.Container.prototype.requestPermission = function(permissions, reason,
    opt_callback) {};


/**
 * Attempts to navigate to this gadget on a different surface. If the container
 * supports parameters will pass the optional parameters along to the gadget on
 * the new surface.
 *
 * @param {opensocial.Surface} surface The surface to navigate to
 * @param {Map.<String, String>} opt_params Params to pass to the gadget after
 *    it has been navigated to on the surface
 *
 * @private
 */
opensocial.Container.prototype.requestNavigateTo = function(surface,
    opt_params) {};


/**
 * Fetches content from the provided URL and feeds that content into the
 * callback function.
 * @param {String} url The URL where the content is located
 * @param {Function} callback The function to call with the data from the URL
 *     once it is fetched
 * @param {Map.<opensocial.ContentRequestParameters, Object>} opt_params
 *     Additional parameters to pass to the request
 *
 * @private
 */
opensocial.Container.prototype.makeRequest = function(url, callback,
    opt_params) {};


/**
 * Calls the callback function with a dataResponse object containing the data
 * asked for in the dataRequest object.
 *
 * @param {opensocial.DataRequest} dataRequest Specifies which data to get from
 *    the server
 * @param {Function} callback Function to call after the data is fetched
 * @private
 */
opensocial.Container.prototype.requestData = function(dataRequest, callback) {};


/**
 * Request a profile for the specified person id.
 * When processed, returns a Person object.
 *
 * @param {String} id The id of the person to fetch. Can also be standard
 *    person IDs of VIEWER and OWNER.
 * @param {Map.<opensocial.DataRequest.PeopleRequestFields, Object>} opt_params
 *    Additional params to pass to the request. This request supports
 *    PROFILE_DETAILS.
 * @return {Object} a request object
 * @private
 */
opensocial.Container.prototype.newFetchPersonRequest = function(id,
    opt_params) {};


/**
 * Used to request friends from the server.
 * When processed, returns a Collection&lt;Person&gt; object.
 *
 * @param {Array.<String> | String} idSpec An id, array of ids, or a group
 *    reference used to specify which people to fetch
 * @param {Map.<opensocial.DataRequest.PeopleRequestFields, Object>} opt_params
 *    Additional params to pass to the request. This request supports
 *    PROFILE_DETAILS, SORT_ORDER, FILTER, FIRST, and MAX.
 * @return {Object} a request object
 * @private
 */
opensocial.Container.prototype.newFetchPeopleRequest = function(idSpec,
    opt_params) {};


/**
 * Used to request global app data.
 * When processed, returns a Map&lt;String, String&gt; object.
 *
 * @param {Array.<String> | String} keys The keys you want data for. This
 *     can be an array of key names, a single key name, or "*" to mean
 *     "all keys".
 * @return {Object} a request object
 * @private
 */
opensocial.Container.prototype.newFetchGlobalAppDataRequest = function(
    keys) {};


/**
 * Used to request instance app data.
 * When processed, returns a Map&lt;String, String&gt; object.
 *
 * @param {Array.<String> | String} keys The keys you want data for. This
 *     can be an array of key names, a single key name, or "*" to mean
 *     "all keys".
 * @return {Object} a request object
 * @private
 */
opensocial.Container.prototype.newFetchInstanceAppDataRequest = function(
    keys) {};


/**
 * Used to request an update of an app instance field from the server.
 * When processed, does not return any data.
 *
 * @param {String} key The name of the key
 * @param {String} value The value
 * @return {Object} a request object
 * @private
 */
opensocial.Container.prototype.newUpdateInstanceAppDataRequest = function(key,
    value) {};


/**
 * Used to request app data for the given people.
 * When processed, returns a Map&lt;person id, Map&lt;String, String&gt;&gt;
 * object.
 *
 * @param {Array.<String> | String} idSpec An ID, array of IDs, or a group
 *    reference; the supported keys are VIEWER, OWNER, VIEWER_FRIENDS,
 *    OWNER_FRIENDS, or a single ID within one of those groups
 * @param {Array.<String> | String} keys The keys you want data for. This
 *     can be an array of key names, a single key name, or "*" to mean
 *     "all keys".
 * @return {Object} a request object
 * @private
 */
opensocial.Container.prototype.newFetchPersonAppDataRequest = function(idSpec,
    keys) {};


/**
 * Used to request an update of an app field for the given person.
 * When processed, does not return any data.
 *
 * @param {String} id The id of the person to update. (Right now only the
 *    special VIEWER id is allowed.)
 * @param {String} key The name of the key
 * @param {String} value The value
 * @return {Object} a request object
 * @private
 */
opensocial.Container.prototype.newUpdatePersonAppDataRequest = function(id,
    key, value) {};


/**
 * Used to request an activity stream from the server.
 *
 * When processed, returns an object whose "activities" property is a
 * Collection&lt;Activity&gt; object.
 *
 * @param {Array.<String> | String} idSpec An ID, array of IDs, or a group
 *    reference used to specify which people's activities to fetch; the
 *    supported keys are VIEWER, OWNER, VIEWER_FRIENDS, OWNER_FRIENDS, or
 *    a single ID within one of those groups.
 * @param {Map.<opensocial.DataRequest.ActivityRequestFields, Object>} opt_params
 *    Additional params to pass to the request.
 * @return {Object} a request object
 * @private
 */
opensocial.Container.prototype.newFetchActivitiesRequest = function(idSpec,
    opt_params) {};


/**
 * Creates a new collection with caja support if enabled.
 * @return {opensocial.Collection} the collection object
 * @private
 */
opensocial.Container.prototype.newCollection = function(array, opt_offset,
    opt_totalSize) {
  return this.wrapCollectionWithCaja_(new opensocial.Collection(array,
      opt_offset, opt_totalSize));
};


/**
 * Creates a new person with caja support if enabled.
 * @return {opensocial.Person} the person object
 * @private
 */
opensocial.Container.prototype.newPerson = function(opt_params, opt_isOwner,
    opt_isViewer) {
  return this.wrapPersonWithCaja_(new opensocial.Person(opt_params, opt_isOwner,
      opt_isViewer));
};


/**
 * Get an activity object used to create activities on the server
 *
 * @param {opensocial.Activity.Template || String} title The title of an
 *     activity, a template is reccommended, but this field can also be a
 *     string.
 * @param {Map.<opensocial.Activity.Field, Object>} opt_params Any other
 *    fields that should be set on the activity object. All of the defined
 *    Fields are supported.
 * @return {opensocial.Activity} the activity object
 * @private
 */
opensocial.Container.prototype.newActivity = function(title,
    opt_params) {
  return this.wrapActivityWithCaja_(new opensocial.Activity(title, opt_params));
};


/**
 * A media item associated with an activity. Represents images, movies, and
 * audio. Used when creating activities on the server
 *
 * @param {String} mimeType of the media
 * @param {String} url where the media can be found
 * @param {Map.<opensocial.Activity.MediaItem.Field, Object>} opt_params
 *    Any other fields that should be set on the media item object.
 *    All of the defined Fields are supported.
 *
 * @return {opensocial.Activity.MediaItem} the media item object
 * @private
 */
opensocial.Container.prototype.newActivityMediaItem = function(mimeType, url,
    opt_params) {
  return this.wrapActivityMediaItemWithCaja_(
      new opensocial.Activity.MediaItem(mimeType, url, opt_params));
};


/**
 * Creates a new response item with caja support if enabled.
 * @return {opensocial.ResponseItem} the response item object
 * @private
 */
opensocial.Container.prototype.newResponseItem = function(originalDataRequest,
    data, opt_errorCode, opt_errorMessage) {
  return this.wrapResponseItemWithCaja_(new opensocial.ResponseItem(
      originalDataRequest, data, opt_errorCode, opt_errorMessage));
};


/**
 * Creates a new data response with caja support if enabled.
 * @return {opensocial.DataResponse} the data response object
 * @private
 */
opensocial.Container.prototype.newDataResponse = function(responseItems,
    opt_globalError) {
  return this.wrapDataResponseWithCaja_(new opensocial.DataResponse(
      responseItems, opt_globalError));
};


/**
 * Get a data request object to use for sending and fetching data from the
 * server.
 *
 * @return {opensocial.DataRequest} the request object
 * @private
 */
opensocial.Container.prototype.newDataRequest = function() {
  return this.wrapDataRequestWithCaja_(new opensocial.DataRequest());
};


/**
 * Get a new environment object.
 *
 * @return {opensocial.Environment} the environment object
 * @private
 */
opensocial.Container.prototype.newEnvironment = function(domain, surface,
    supportedSurfaces, supportedFields, opt_params) {
  return this.wrapEnvironmentWithCaja_(new opensocial.Environment(domain,
      surface, supportedSurfaces, supportedFields, opt_params));
};


/**
 * Get a new surface object.
 *
 * @return {opensocial.Surface} the surface object
 * @private
 */
opensocial.Container.prototype.newSurface = function(name,
    opt_isPrimaryContent) {
  return this.wrapSurfaceWithCaja_(new opensocial.Surface(name,
      opt_isPrimaryContent));
};


/**
 * Returns true if the specified value is an array
 * @param {Object} val Variable to test
 * @return {boolean} Whether variable is an array
 * @private
 */
opensocial.Container.isArray = function(val) {
  return val instanceof Array;
};


/**
 * Caja Support
 */
var caja;
var ___;

/**
 * Enable Caja support
 *
 * @type Container
 * @private
 */

// TODO(doll): As caja evolves this method should get a lot smaller
opensocial.Container.prototype.enableCaja = function() {

  ___ = window["___"];
  caja = window["caja"];

  var outers = caja.copy(___.sharedOuters);

  // TODO(doll): Is this the way all containers should do this?
  var igOnload = window["_IG_RegisterOnloadHandler"];
  if (igOnload) {
    outers._IG_RegisterOnloadHandler = ___.simpleFunc(igOnload);
  }

  // TODO(doll): Remove need for this
  outers.expose = function expose(name, func) {
    // TODO(benl): we should check that name does not contain
    // anything except numbers and letters.
    eval(name + ' = func;');
  };

  outers.emitHtml___ = function emitHtml(html) {
    // TODO(doll): This only works for the sample container. Really emitHtml
    // should be a passed in function
    var oldHtml = document.getElementById("gadgetContent").innerHTML;
    document.getElementById("gadgetContent").innerHTML = oldHtml + html;
  };


  outers.document = function() {};
  outers.document.getElementById = function(id) {
    // TODO(benl): namespace-ize id.
    var element = document.getElementById(id);
    // TODO(benl): replace innerHTML with hidden getter/setter
    ___.allowSet(element, 'innerHTML');
    return element;
  };

  ___.allowCall(outers.document, 'getElementById');

  outers.opensocial = opensocial;
  ___.allowCall(outers.opensocial, 'requestCreateActivity');
  ___.allowCall(outers.opensocial, 'hasPermission');
  ___.allowCall(outers.opensocial, 'requestPermission');
  ___.allowCall(outers.opensocial, 'requestNavigateTo');
  ___.allowCall(outers.opensocial, 'getEnvironment');
  ___.allowCall(outers.opensocial, 'newDataRequest');
  ___.allowCall(outers.opensocial, 'newActivity');
  ___.allowCall(outers.opensocial, 'newActivityMediaItem');

  var moduleHandler = ___.freeze({
    getOuters: ___.simpleFunc(function() { return outers; }),
    handle: ___.simpleFunc(function(newModule) { newModule(outers); })
  });


 this.cajaEnabled_ = true;
  ___.setNewModuleHandler(moduleHandler);
};


opensocial.Container.prototype.wrapCollectionWithCaja_ = function(collection) {
  if (this.cajaEnabled_) {
    ___.allowCall(collection, 'getById');
    ___.allowCall(collection, 'size');
    ___.allowCall(collection, 'each');
    ___.allowCall(collection, 'asArray');
    ___.allowCall(collection, 'getTotalSize');
    ___.allowCall(collection, 'getOffset');

    // TODO(doll): Call caja method to support all array calls once it exists
    ___.allowCall(collection.asArray(), 'push');
    ___.allowCall(collection.asArray(), 'sort');
  }
  return collection;
};


opensocial.Container.prototype.wrapPersonWithCaja_ = function(person) {
  if (this.cajaEnabled_) {
    ___.allowCall(person, 'getId');
    ___.allowCall(person, 'getDisplayName');
    ___.allowCall(person, 'getField');
    ___.allowCall(person, 'isViewer');
    ___.allowCall(person, 'isOwner');
  }
  return person;
};


opensocial.Container.prototype.wrapActivityWithCaja_ = function(activity) {
  if (this.cajaEnabled_) {
    ___.allowCall(activity, 'getId');
    ___.allowCall(activity, 'getField');
  }
  return activity;
};


opensocial.Container.prototype.wrapActivityMediaItemWithCaja_ = function(
    mediaItem) {
  if (this.cajaEnabled_) {
    ___.allowCall(mediaItem, 'getField');
  }
  return mediaItem;
};


opensocial.Container.prototype.wrapResponseItemWithCaja_ = function(
    responseItem) {
  if (this.cajaEnabled_) {
    ___.allowCall(responseItem, 'hadError');
    ___.allowCall(responseItem, 'getError');
    ___.allowCall(responseItem, 'getOriginalDataRequest');
    ___.allowCall(responseItem, 'getData');
  }
  return responseItem;
};


opensocial.Container.prototype.wrapDataResponseWithCaja_ = function(
    dataResponse) {
  if (this.cajaEnabled_) {
    ___.allowCall(dataResponse, 'hadError');
    ___.allowCall(dataResponse, 'get');
  }
  return dataResponse;
};


opensocial.Container.prototype.wrapDataRequestWithCaja_ = function(request) {
  if (this.cajaEnabled_) {
    ___.allowCall(request, 'getRequestObjects');
    ___.allowCall(request, 'add');
    ___.allowCall(request, 'send');
    ___.allowCall(request, 'newFetchPersonRequest');
    ___.allowCall(request, 'newFetchPeopleRequest');
    ___.allowCall(request, 'newFetchGlobalAppDataRequest');
    ___.allowCall(request, 'newFetchInstanceAppDataRequest');
    ___.allowCall(request, 'newUpdateInstanceAppDataRequest');
    ___.allowCall(request, 'newFetchPersonAppDataRequest');
    ___.allowCall(request, 'newUpdatePersonAppDataRequest');
    ___.allowCall(request, 'newFetchActivitiesRequest');
  }
  return request;
};


opensocial.Container.prototype.wrapEnvironmentWithCaja_ = function(
    environment) {
  if (this.cajaEnabled_) {
    ___.allowCall(environment, 'getDomain');
    ___.allowCall(environment, 'getSurface');
    ___.allowCall(environment, 'getSupportedSurfaces');
    ___.allowCall(environment, 'getParams');
    ___.allowCall(environment, 'supportsField');
    ___.allowCall(environment, 'hasCapability');
  }
  return environment;
};


opensocial.Container.prototype.wrapSurfaceWithCaja_ = function(surface) {
  if (this.cajaEnabled_) {
    ___.allowCall(surface, 'getName');
    ___.allowCall(surface, 'isPrimaryContent');
  }
  return surface;
};